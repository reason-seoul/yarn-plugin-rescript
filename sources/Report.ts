import sliceAnsi from '@arcanis/slice-ansi';
import type { Writable } from 'stream';
import type { Configuration } from '@yarnpkg/core';
import { LightReport, MessageName, formatUtils } from '@yarnpkg/core';

type ReportOptions = ConstructorParameters<typeof LightReport>[0] & {
  json?: boolean,
};

export default class Report extends LightReport {
  static async start(opts: ReportOptions, cb: (report: Report) => Promise<void>) {
    const report = new this(opts);

    try {
      await cb(report);
    } catch (error) {
      report.reportExceptionOnce(error);
    } finally {
      await report.finalize();
    }

    return report;
  }

  #configuration: Configuration;
  #stdout: Writable;
  #json: boolean;

  warningCount = 0;

  constructor({
    configuration,
    stdout,
    json = false,
  }: ReportOptions) {
    super({ configuration, stdout });

    this.#configuration = configuration;
    this.#stdout = stdout;
    this.#json = json;
  }

  reportSeparator() {
    this.reportInfo(null, '');
  }

  reportInfo(name: MessageName | null, text: string) {
    const formattedName = this.#formatNameWithHyperlink(name);
    const prefix = formattedName ? `${formattedName}: ` : '';

    if (this.#json) {
      this.reportJson({ type: 'info', name, displayName: this.#formatName(name), data: text });
    } else {
      this.#stdout.write(`${this.#truncate(`${formatUtils.pretty(this.#configuration, `➤`, `blueBright`)} ${prefix}${text}`, { truncate: true })}\n`);
    }
  }

  reportWarning(name: MessageName, text: string) {
    this.warningCount += 1;

    const formattedName = this.#formatNameWithHyperlink(name);
    const prefix = formattedName ? `${formattedName}: ` : '';

    if (this.#json) {
      this.reportJson({ type: 'warning', name, displayName: this.#formatName(name), data: text });
    } else {
      this.#stdout.write(`${formatUtils.pretty(this.#configuration, `➤`, `yellowBright`)} ${prefix}${text}`);
    }
  }

  reportJson(data: any) {
    if (this.#json) {
      this.#stdout.write(`${this.#truncate(JSON.stringify(data), { truncate: true })}\n`);
    }
  }

  #formatName(name: MessageName) {
    return formatName(name, { configuration: this.#configuration, json: this.#json });
  }

  #formatNameWithHyperlink(name: MessageName | null) {
    return formatNameWithHyperlink(name, {
      configuration: this.#configuration,
      json: this.#json,
    });
  }

  #truncate(str: string, { truncate = false }: { truncate?: boolean } = {}) {
    if (!this.#configuration.get('enableProgressBars')) {
      truncate = false;
    }

    if (typeof truncate === 'undefined') {
      truncate = this.#configuration.get('preferTruncatedLines');
    }

    // The -1 is to account for terminals that would wrap after
    // the last column rather before the first overwrite
    if (truncate) {
      str = sliceAnsi(str, 0, process.stdout.columns - 1);
    }

    return str;
  }
}

function stringifyMessageName(name: MessageName | number): string {
  return `YN${name.toString(10).padStart(4, '0')}`;
}

function formatName(name: MessageName | null, { configuration, json }: { configuration: Configuration, json: boolean }) {
  const num = name === null ? 0 : name;
  const label = stringifyMessageName(num);

  if (!json && name === null) {
    return formatUtils.pretty(configuration, label, 'grey');
  } else {
    return label;
  }
}

function formatNameWithHyperlink(name: MessageName | null, { configuration, json }: { configuration: Configuration, json: boolean }) {
  const code = formatName(name, { configuration, json });
  if (!code) {
    return code;
  }

  // Don't print hyperlinks for the generic messages
  if (name === null || name === MessageName.UNNAMED) {
    return code;
  }

  const desc = MessageName[name];
  const href = `https://yarnpkg.com/advanced/error-codes#${code}---${desc}`.toLowerCase();

  return applyHyperlink(configuration, code, href);
}

export function applyHyperlink(configuration: Configuration, text: string, href: string) {
  // Only print hyperlinks if allowed per configuration
  if (!configuration.get('enableHyperlinks')) {
    return text;
  }

  // We use ESC as ST for Konsole because it doesn't support
  // the non-standard BEL character for hyperlinks
  if (!!process.env.KONSOLE_VERSION) {
    return `\u001b]8;;${href}\u001b\\${text}\u001b]8;;\u001b\\`;
  }

  // We use BELL as ST because it seems that iTerm doesn't properly support
  // the \x1b\\ sequence described in the reference document
  // https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda#the-escape-sequence
  return `\u001b]8;;${href}\u0007${text}\u001b]8;;\u0007`;
}
