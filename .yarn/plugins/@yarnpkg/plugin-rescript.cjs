/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-rescript",
factory: function (require) {
var plugin;(()=>{var e={220:(e,t,r)=>{const n=r(413),i=/^(.*?)(\x1b\[[^m]+m|\x1b\]8;;.*?(\x1b\\|\u0007))/,s=new n;e.exports=(e,t=0,r=e.length)=>{if(t<0||r<0)throw new RangeError("Negative indices aren't supported by this implementation");const n=r-t;let o="",a=0,c=0;for(;e.length>0;){const r=e.match(i)||[e,e,void 0];let l=s.splitGraphemes(r[1]);const d=Math.min(t-a,l.length);l=l.slice(d);const p=Math.min(n-c,l.length);o+=l.slice(0,p).join(""),a+=d,c+=p,void 0!==r[2]&&(o+=r[2]),e=e.slice(r[0].length)}return o}},413:e=>{e.exports&&(e.exports=function(){var e=3,t=4,r=12,n=13,i=16,s=17;function o(e,t){void 0===t&&(t=0);var r=e.charCodeAt(t);if(55296<=r&&r<=56319&&t<e.length-1){var n=r;return 56320<=(i=e.charCodeAt(t+1))&&i<=57343?1024*(n-55296)+(i-56320)+65536:n}if(56320<=r&&r<=57343&&t>=1){var i=r;return 55296<=(n=e.charCodeAt(t-1))&&n<=56319?1024*(n-55296)+(i-56320)+65536:i}return r}function a(o,a,c){var l=[o].concat(a).concat([c]),d=l[l.length-2],p=c,u=l.lastIndexOf(14);if(u>1&&l.slice(1,u).every((function(t){return t==e}))&&-1==[e,n,s].indexOf(o))return 2;var h=l.lastIndexOf(t);if(h>0&&l.slice(1,h).every((function(e){return e==t}))&&-1==[r,t].indexOf(d))return l.filter((function(e){return e==t})).length%2==1?3:4;if(0==d&&1==p)return 0;if(2==d||0==d||1==d)return 14==p&&a.every((function(t){return t==e}))?2:1;if(2==p||0==p||1==p)return 1;if(6==d&&(6==p||7==p||9==p||10==p))return 0;if(!(9!=d&&7!=d||7!=p&&8!=p))return 0;if((10==d||8==d)&&8==p)return 0;if(p==e||15==p)return 0;if(5==p)return 0;if(d==r)return 0;var f=-1!=l.indexOf(e)?l.lastIndexOf(e)-1:l.length-2;return-1!=[n,s].indexOf(l[f])&&l.slice(f+1,-1).every((function(t){return t==e}))&&14==p||15==d&&-1!=[i,s].indexOf(p)?0:-1!=a.indexOf(t)?2:d==t&&p==t?0:1}function c(o){return 1536<=o&&o<=1541||1757==o||1807==o||2274==o||3406==o||69821==o||70082<=o&&o<=70083||72250==o||72326<=o&&o<=72329||73030==o?r:13==o?0:10==o?1:0<=o&&o<=9||11<=o&&o<=12||14<=o&&o<=31||127<=o&&o<=159||173==o||1564==o||6158==o||8203==o||8206<=o&&o<=8207||8232==o||8233==o||8234<=o&&o<=8238||8288<=o&&o<=8292||8293==o||8294<=o&&o<=8303||55296<=o&&o<=57343||65279==o||65520<=o&&o<=65528||65529<=o&&o<=65531||113824<=o&&o<=113827||119155<=o&&o<=119162||917504==o||917505==o||917506<=o&&o<=917535||917632<=o&&o<=917759||918e3<=o&&o<=921599?2:768<=o&&o<=879||1155<=o&&o<=1159||1160<=o&&o<=1161||1425<=o&&o<=1469||1471==o||1473<=o&&o<=1474||1476<=o&&o<=1477||1479==o||1552<=o&&o<=1562||1611<=o&&o<=1631||1648==o||1750<=o&&o<=1756||1759<=o&&o<=1764||1767<=o&&o<=1768||1770<=o&&o<=1773||1809==o||1840<=o&&o<=1866||1958<=o&&o<=1968||2027<=o&&o<=2035||2070<=o&&o<=2073||2075<=o&&o<=2083||2085<=o&&o<=2087||2089<=o&&o<=2093||2137<=o&&o<=2139||2260<=o&&o<=2273||2275<=o&&o<=2306||2362==o||2364==o||2369<=o&&o<=2376||2381==o||2385<=o&&o<=2391||2402<=o&&o<=2403||2433==o||2492==o||2494==o||2497<=o&&o<=2500||2509==o||2519==o||2530<=o&&o<=2531||2561<=o&&o<=2562||2620==o||2625<=o&&o<=2626||2631<=o&&o<=2632||2635<=o&&o<=2637||2641==o||2672<=o&&o<=2673||2677==o||2689<=o&&o<=2690||2748==o||2753<=o&&o<=2757||2759<=o&&o<=2760||2765==o||2786<=o&&o<=2787||2810<=o&&o<=2815||2817==o||2876==o||2878==o||2879==o||2881<=o&&o<=2884||2893==o||2902==o||2903==o||2914<=o&&o<=2915||2946==o||3006==o||3008==o||3021==o||3031==o||3072==o||3134<=o&&o<=3136||3142<=o&&o<=3144||3146<=o&&o<=3149||3157<=o&&o<=3158||3170<=o&&o<=3171||3201==o||3260==o||3263==o||3266==o||3270==o||3276<=o&&o<=3277||3285<=o&&o<=3286||3298<=o&&o<=3299||3328<=o&&o<=3329||3387<=o&&o<=3388||3390==o||3393<=o&&o<=3396||3405==o||3415==o||3426<=o&&o<=3427||3530==o||3535==o||3538<=o&&o<=3540||3542==o||3551==o||3633==o||3636<=o&&o<=3642||3655<=o&&o<=3662||3761==o||3764<=o&&o<=3769||3771<=o&&o<=3772||3784<=o&&o<=3789||3864<=o&&o<=3865||3893==o||3895==o||3897==o||3953<=o&&o<=3966||3968<=o&&o<=3972||3974<=o&&o<=3975||3981<=o&&o<=3991||3993<=o&&o<=4028||4038==o||4141<=o&&o<=4144||4146<=o&&o<=4151||4153<=o&&o<=4154||4157<=o&&o<=4158||4184<=o&&o<=4185||4190<=o&&o<=4192||4209<=o&&o<=4212||4226==o||4229<=o&&o<=4230||4237==o||4253==o||4957<=o&&o<=4959||5906<=o&&o<=5908||5938<=o&&o<=5940||5970<=o&&o<=5971||6002<=o&&o<=6003||6068<=o&&o<=6069||6071<=o&&o<=6077||6086==o||6089<=o&&o<=6099||6109==o||6155<=o&&o<=6157||6277<=o&&o<=6278||6313==o||6432<=o&&o<=6434||6439<=o&&o<=6440||6450==o||6457<=o&&o<=6459||6679<=o&&o<=6680||6683==o||6742==o||6744<=o&&o<=6750||6752==o||6754==o||6757<=o&&o<=6764||6771<=o&&o<=6780||6783==o||6832<=o&&o<=6845||6846==o||6912<=o&&o<=6915||6964==o||6966<=o&&o<=6970||6972==o||6978==o||7019<=o&&o<=7027||7040<=o&&o<=7041||7074<=o&&o<=7077||7080<=o&&o<=7081||7083<=o&&o<=7085||7142==o||7144<=o&&o<=7145||7149==o||7151<=o&&o<=7153||7212<=o&&o<=7219||7222<=o&&o<=7223||7376<=o&&o<=7378||7380<=o&&o<=7392||7394<=o&&o<=7400||7405==o||7412==o||7416<=o&&o<=7417||7616<=o&&o<=7673||7675<=o&&o<=7679||8204==o||8400<=o&&o<=8412||8413<=o&&o<=8416||8417==o||8418<=o&&o<=8420||8421<=o&&o<=8432||11503<=o&&o<=11505||11647==o||11744<=o&&o<=11775||12330<=o&&o<=12333||12334<=o&&o<=12335||12441<=o&&o<=12442||42607==o||42608<=o&&o<=42610||42612<=o&&o<=42621||42654<=o&&o<=42655||42736<=o&&o<=42737||43010==o||43014==o||43019==o||43045<=o&&o<=43046||43204<=o&&o<=43205||43232<=o&&o<=43249||43302<=o&&o<=43309||43335<=o&&o<=43345||43392<=o&&o<=43394||43443==o||43446<=o&&o<=43449||43452==o||43493==o||43561<=o&&o<=43566||43569<=o&&o<=43570||43573<=o&&o<=43574||43587==o||43596==o||43644==o||43696==o||43698<=o&&o<=43700||43703<=o&&o<=43704||43710<=o&&o<=43711||43713==o||43756<=o&&o<=43757||43766==o||44005==o||44008==o||44013==o||64286==o||65024<=o&&o<=65039||65056<=o&&o<=65071||65438<=o&&o<=65439||66045==o||66272==o||66422<=o&&o<=66426||68097<=o&&o<=68099||68101<=o&&o<=68102||68108<=o&&o<=68111||68152<=o&&o<=68154||68159==o||68325<=o&&o<=68326||69633==o||69688<=o&&o<=69702||69759<=o&&o<=69761||69811<=o&&o<=69814||69817<=o&&o<=69818||69888<=o&&o<=69890||69927<=o&&o<=69931||69933<=o&&o<=69940||70003==o||70016<=o&&o<=70017||70070<=o&&o<=70078||70090<=o&&o<=70092||70191<=o&&o<=70193||70196==o||70198<=o&&o<=70199||70206==o||70367==o||70371<=o&&o<=70378||70400<=o&&o<=70401||70460==o||70462==o||70464==o||70487==o||70502<=o&&o<=70508||70512<=o&&o<=70516||70712<=o&&o<=70719||70722<=o&&o<=70724||70726==o||70832==o||70835<=o&&o<=70840||70842==o||70845==o||70847<=o&&o<=70848||70850<=o&&o<=70851||71087==o||71090<=o&&o<=71093||71100<=o&&o<=71101||71103<=o&&o<=71104||71132<=o&&o<=71133||71219<=o&&o<=71226||71229==o||71231<=o&&o<=71232||71339==o||71341==o||71344<=o&&o<=71349||71351==o||71453<=o&&o<=71455||71458<=o&&o<=71461||71463<=o&&o<=71467||72193<=o&&o<=72198||72201<=o&&o<=72202||72243<=o&&o<=72248||72251<=o&&o<=72254||72263==o||72273<=o&&o<=72278||72281<=o&&o<=72283||72330<=o&&o<=72342||72344<=o&&o<=72345||72752<=o&&o<=72758||72760<=o&&o<=72765||72767==o||72850<=o&&o<=72871||72874<=o&&o<=72880||72882<=o&&o<=72883||72885<=o&&o<=72886||73009<=o&&o<=73014||73018==o||73020<=o&&o<=73021||73023<=o&&o<=73029||73031==o||92912<=o&&o<=92916||92976<=o&&o<=92982||94095<=o&&o<=94098||113821<=o&&o<=113822||119141==o||119143<=o&&o<=119145||119150<=o&&o<=119154||119163<=o&&o<=119170||119173<=o&&o<=119179||119210<=o&&o<=119213||119362<=o&&o<=119364||121344<=o&&o<=121398||121403<=o&&o<=121452||121461==o||121476==o||121499<=o&&o<=121503||121505<=o&&o<=121519||122880<=o&&o<=122886||122888<=o&&o<=122904||122907<=o&&o<=122913||122915<=o&&o<=122916||122918<=o&&o<=122922||125136<=o&&o<=125142||125252<=o&&o<=125258||917536<=o&&o<=917631||917760<=o&&o<=917999?e:127462<=o&&o<=127487?t:2307==o||2363==o||2366<=o&&o<=2368||2377<=o&&o<=2380||2382<=o&&o<=2383||2434<=o&&o<=2435||2495<=o&&o<=2496||2503<=o&&o<=2504||2507<=o&&o<=2508||2563==o||2622<=o&&o<=2624||2691==o||2750<=o&&o<=2752||2761==o||2763<=o&&o<=2764||2818<=o&&o<=2819||2880==o||2887<=o&&o<=2888||2891<=o&&o<=2892||3007==o||3009<=o&&o<=3010||3014<=o&&o<=3016||3018<=o&&o<=3020||3073<=o&&o<=3075||3137<=o&&o<=3140||3202<=o&&o<=3203||3262==o||3264<=o&&o<=3265||3267<=o&&o<=3268||3271<=o&&o<=3272||3274<=o&&o<=3275||3330<=o&&o<=3331||3391<=o&&o<=3392||3398<=o&&o<=3400||3402<=o&&o<=3404||3458<=o&&o<=3459||3536<=o&&o<=3537||3544<=o&&o<=3550||3570<=o&&o<=3571||3635==o||3763==o||3902<=o&&o<=3903||3967==o||4145==o||4155<=o&&o<=4156||4182<=o&&o<=4183||4228==o||6070==o||6078<=o&&o<=6085||6087<=o&&o<=6088||6435<=o&&o<=6438||6441<=o&&o<=6443||6448<=o&&o<=6449||6451<=o&&o<=6456||6681<=o&&o<=6682||6741==o||6743==o||6765<=o&&o<=6770||6916==o||6965==o||6971==o||6973<=o&&o<=6977||6979<=o&&o<=6980||7042==o||7073==o||7078<=o&&o<=7079||7082==o||7143==o||7146<=o&&o<=7148||7150==o||7154<=o&&o<=7155||7204<=o&&o<=7211||7220<=o&&o<=7221||7393==o||7410<=o&&o<=7411||7415==o||43043<=o&&o<=43044||43047==o||43136<=o&&o<=43137||43188<=o&&o<=43203||43346<=o&&o<=43347||43395==o||43444<=o&&o<=43445||43450<=o&&o<=43451||43453<=o&&o<=43456||43567<=o&&o<=43568||43571<=o&&o<=43572||43597==o||43755==o||43758<=o&&o<=43759||43765==o||44003<=o&&o<=44004||44006<=o&&o<=44007||44009<=o&&o<=44010||44012==o||69632==o||69634==o||69762==o||69808<=o&&o<=69810||69815<=o&&o<=69816||69932==o||70018==o||70067<=o&&o<=70069||70079<=o&&o<=70080||70188<=o&&o<=70190||70194<=o&&o<=70195||70197==o||70368<=o&&o<=70370||70402<=o&&o<=70403||70463==o||70465<=o&&o<=70468||70471<=o&&o<=70472||70475<=o&&o<=70477||70498<=o&&o<=70499||70709<=o&&o<=70711||70720<=o&&o<=70721||70725==o||70833<=o&&o<=70834||70841==o||70843<=o&&o<=70844||70846==o||70849==o||71088<=o&&o<=71089||71096<=o&&o<=71099||71102==o||71216<=o&&o<=71218||71227<=o&&o<=71228||71230==o||71340==o||71342<=o&&o<=71343||71350==o||71456<=o&&o<=71457||71462==o||72199<=o&&o<=72200||72249==o||72279<=o&&o<=72280||72343==o||72751==o||72766==o||72873==o||72881==o||72884==o||94033<=o&&o<=94078||119142==o||119149==o?5:4352<=o&&o<=4447||43360<=o&&o<=43388?6:4448<=o&&o<=4519||55216<=o&&o<=55238?7:4520<=o&&o<=4607||55243<=o&&o<=55291?8:44032==o||44060==o||44088==o||44116==o||44144==o||44172==o||44200==o||44228==o||44256==o||44284==o||44312==o||44340==o||44368==o||44396==o||44424==o||44452==o||44480==o||44508==o||44536==o||44564==o||44592==o||44620==o||44648==o||44676==o||44704==o||44732==o||44760==o||44788==o||44816==o||44844==o||44872==o||44900==o||44928==o||44956==o||44984==o||45012==o||45040==o||45068==o||45096==o||45124==o||45152==o||45180==o||45208==o||45236==o||45264==o||45292==o||45320==o||45348==o||45376==o||45404==o||45432==o||45460==o||45488==o||45516==o||45544==o||45572==o||45600==o||45628==o||45656==o||45684==o||45712==o||45740==o||45768==o||45796==o||45824==o||45852==o||45880==o||45908==o||45936==o||45964==o||45992==o||46020==o||46048==o||46076==o||46104==o||46132==o||46160==o||46188==o||46216==o||46244==o||46272==o||46300==o||46328==o||46356==o||46384==o||46412==o||46440==o||46468==o||46496==o||46524==o||46552==o||46580==o||46608==o||46636==o||46664==o||46692==o||46720==o||46748==o||46776==o||46804==o||46832==o||46860==o||46888==o||46916==o||46944==o||46972==o||47e3==o||47028==o||47056==o||47084==o||47112==o||47140==o||47168==o||47196==o||47224==o||47252==o||47280==o||47308==o||47336==o||47364==o||47392==o||47420==o||47448==o||47476==o||47504==o||47532==o||47560==o||47588==o||47616==o||47644==o||47672==o||47700==o||47728==o||47756==o||47784==o||47812==o||47840==o||47868==o||47896==o||47924==o||47952==o||47980==o||48008==o||48036==o||48064==o||48092==o||48120==o||48148==o||48176==o||48204==o||48232==o||48260==o||48288==o||48316==o||48344==o||48372==o||48400==o||48428==o||48456==o||48484==o||48512==o||48540==o||48568==o||48596==o||48624==o||48652==o||48680==o||48708==o||48736==o||48764==o||48792==o||48820==o||48848==o||48876==o||48904==o||48932==o||48960==o||48988==o||49016==o||49044==o||49072==o||49100==o||49128==o||49156==o||49184==o||49212==o||49240==o||49268==o||49296==o||49324==o||49352==o||49380==o||49408==o||49436==o||49464==o||49492==o||49520==o||49548==o||49576==o||49604==o||49632==o||49660==o||49688==o||49716==o||49744==o||49772==o||49800==o||49828==o||49856==o||49884==o||49912==o||49940==o||49968==o||49996==o||50024==o||50052==o||50080==o||50108==o||50136==o||50164==o||50192==o||50220==o||50248==o||50276==o||50304==o||50332==o||50360==o||50388==o||50416==o||50444==o||50472==o||50500==o||50528==o||50556==o||50584==o||50612==o||50640==o||50668==o||50696==o||50724==o||50752==o||50780==o||50808==o||50836==o||50864==o||50892==o||50920==o||50948==o||50976==o||51004==o||51032==o||51060==o||51088==o||51116==o||51144==o||51172==o||51200==o||51228==o||51256==o||51284==o||51312==o||51340==o||51368==o||51396==o||51424==o||51452==o||51480==o||51508==o||51536==o||51564==o||51592==o||51620==o||51648==o||51676==o||51704==o||51732==o||51760==o||51788==o||51816==o||51844==o||51872==o||51900==o||51928==o||51956==o||51984==o||52012==o||52040==o||52068==o||52096==o||52124==o||52152==o||52180==o||52208==o||52236==o||52264==o||52292==o||52320==o||52348==o||52376==o||52404==o||52432==o||52460==o||52488==o||52516==o||52544==o||52572==o||52600==o||52628==o||52656==o||52684==o||52712==o||52740==o||52768==o||52796==o||52824==o||52852==o||52880==o||52908==o||52936==o||52964==o||52992==o||53020==o||53048==o||53076==o||53104==o||53132==o||53160==o||53188==o||53216==o||53244==o||53272==o||53300==o||53328==o||53356==o||53384==o||53412==o||53440==o||53468==o||53496==o||53524==o||53552==o||53580==o||53608==o||53636==o||53664==o||53692==o||53720==o||53748==o||53776==o||53804==o||53832==o||53860==o||53888==o||53916==o||53944==o||53972==o||54e3==o||54028==o||54056==o||54084==o||54112==o||54140==o||54168==o||54196==o||54224==o||54252==o||54280==o||54308==o||54336==o||54364==o||54392==o||54420==o||54448==o||54476==o||54504==o||54532==o||54560==o||54588==o||54616==o||54644==o||54672==o||54700==o||54728==o||54756==o||54784==o||54812==o||54840==o||54868==o||54896==o||54924==o||54952==o||54980==o||55008==o||55036==o||55064==o||55092==o||55120==o||55148==o||55176==o?9:44033<=o&&o<=44059||44061<=o&&o<=44087||44089<=o&&o<=44115||44117<=o&&o<=44143||44145<=o&&o<=44171||44173<=o&&o<=44199||44201<=o&&o<=44227||44229<=o&&o<=44255||44257<=o&&o<=44283||44285<=o&&o<=44311||44313<=o&&o<=44339||44341<=o&&o<=44367||44369<=o&&o<=44395||44397<=o&&o<=44423||44425<=o&&o<=44451||44453<=o&&o<=44479||44481<=o&&o<=44507||44509<=o&&o<=44535||44537<=o&&o<=44563||44565<=o&&o<=44591||44593<=o&&o<=44619||44621<=o&&o<=44647||44649<=o&&o<=44675||44677<=o&&o<=44703||44705<=o&&o<=44731||44733<=o&&o<=44759||44761<=o&&o<=44787||44789<=o&&o<=44815||44817<=o&&o<=44843||44845<=o&&o<=44871||44873<=o&&o<=44899||44901<=o&&o<=44927||44929<=o&&o<=44955||44957<=o&&o<=44983||44985<=o&&o<=45011||45013<=o&&o<=45039||45041<=o&&o<=45067||45069<=o&&o<=45095||45097<=o&&o<=45123||45125<=o&&o<=45151||45153<=o&&o<=45179||45181<=o&&o<=45207||45209<=o&&o<=45235||45237<=o&&o<=45263||45265<=o&&o<=45291||45293<=o&&o<=45319||45321<=o&&o<=45347||45349<=o&&o<=45375||45377<=o&&o<=45403||45405<=o&&o<=45431||45433<=o&&o<=45459||45461<=o&&o<=45487||45489<=o&&o<=45515||45517<=o&&o<=45543||45545<=o&&o<=45571||45573<=o&&o<=45599||45601<=o&&o<=45627||45629<=o&&o<=45655||45657<=o&&o<=45683||45685<=o&&o<=45711||45713<=o&&o<=45739||45741<=o&&o<=45767||45769<=o&&o<=45795||45797<=o&&o<=45823||45825<=o&&o<=45851||45853<=o&&o<=45879||45881<=o&&o<=45907||45909<=o&&o<=45935||45937<=o&&o<=45963||45965<=o&&o<=45991||45993<=o&&o<=46019||46021<=o&&o<=46047||46049<=o&&o<=46075||46077<=o&&o<=46103||46105<=o&&o<=46131||46133<=o&&o<=46159||46161<=o&&o<=46187||46189<=o&&o<=46215||46217<=o&&o<=46243||46245<=o&&o<=46271||46273<=o&&o<=46299||46301<=o&&o<=46327||46329<=o&&o<=46355||46357<=o&&o<=46383||46385<=o&&o<=46411||46413<=o&&o<=46439||46441<=o&&o<=46467||46469<=o&&o<=46495||46497<=o&&o<=46523||46525<=o&&o<=46551||46553<=o&&o<=46579||46581<=o&&o<=46607||46609<=o&&o<=46635||46637<=o&&o<=46663||46665<=o&&o<=46691||46693<=o&&o<=46719||46721<=o&&o<=46747||46749<=o&&o<=46775||46777<=o&&o<=46803||46805<=o&&o<=46831||46833<=o&&o<=46859||46861<=o&&o<=46887||46889<=o&&o<=46915||46917<=o&&o<=46943||46945<=o&&o<=46971||46973<=o&&o<=46999||47001<=o&&o<=47027||47029<=o&&o<=47055||47057<=o&&o<=47083||47085<=o&&o<=47111||47113<=o&&o<=47139||47141<=o&&o<=47167||47169<=o&&o<=47195||47197<=o&&o<=47223||47225<=o&&o<=47251||47253<=o&&o<=47279||47281<=o&&o<=47307||47309<=o&&o<=47335||47337<=o&&o<=47363||47365<=o&&o<=47391||47393<=o&&o<=47419||47421<=o&&o<=47447||47449<=o&&o<=47475||47477<=o&&o<=47503||47505<=o&&o<=47531||47533<=o&&o<=47559||47561<=o&&o<=47587||47589<=o&&o<=47615||47617<=o&&o<=47643||47645<=o&&o<=47671||47673<=o&&o<=47699||47701<=o&&o<=47727||47729<=o&&o<=47755||47757<=o&&o<=47783||47785<=o&&o<=47811||47813<=o&&o<=47839||47841<=o&&o<=47867||47869<=o&&o<=47895||47897<=o&&o<=47923||47925<=o&&o<=47951||47953<=o&&o<=47979||47981<=o&&o<=48007||48009<=o&&o<=48035||48037<=o&&o<=48063||48065<=o&&o<=48091||48093<=o&&o<=48119||48121<=o&&o<=48147||48149<=o&&o<=48175||48177<=o&&o<=48203||48205<=o&&o<=48231||48233<=o&&o<=48259||48261<=o&&o<=48287||48289<=o&&o<=48315||48317<=o&&o<=48343||48345<=o&&o<=48371||48373<=o&&o<=48399||48401<=o&&o<=48427||48429<=o&&o<=48455||48457<=o&&o<=48483||48485<=o&&o<=48511||48513<=o&&o<=48539||48541<=o&&o<=48567||48569<=o&&o<=48595||48597<=o&&o<=48623||48625<=o&&o<=48651||48653<=o&&o<=48679||48681<=o&&o<=48707||48709<=o&&o<=48735||48737<=o&&o<=48763||48765<=o&&o<=48791||48793<=o&&o<=48819||48821<=o&&o<=48847||48849<=o&&o<=48875||48877<=o&&o<=48903||48905<=o&&o<=48931||48933<=o&&o<=48959||48961<=o&&o<=48987||48989<=o&&o<=49015||49017<=o&&o<=49043||49045<=o&&o<=49071||49073<=o&&o<=49099||49101<=o&&o<=49127||49129<=o&&o<=49155||49157<=o&&o<=49183||49185<=o&&o<=49211||49213<=o&&o<=49239||49241<=o&&o<=49267||49269<=o&&o<=49295||49297<=o&&o<=49323||49325<=o&&o<=49351||49353<=o&&o<=49379||49381<=o&&o<=49407||49409<=o&&o<=49435||49437<=o&&o<=49463||49465<=o&&o<=49491||49493<=o&&o<=49519||49521<=o&&o<=49547||49549<=o&&o<=49575||49577<=o&&o<=49603||49605<=o&&o<=49631||49633<=o&&o<=49659||49661<=o&&o<=49687||49689<=o&&o<=49715||49717<=o&&o<=49743||49745<=o&&o<=49771||49773<=o&&o<=49799||49801<=o&&o<=49827||49829<=o&&o<=49855||49857<=o&&o<=49883||49885<=o&&o<=49911||49913<=o&&o<=49939||49941<=o&&o<=49967||49969<=o&&o<=49995||49997<=o&&o<=50023||50025<=o&&o<=50051||50053<=o&&o<=50079||50081<=o&&o<=50107||50109<=o&&o<=50135||50137<=o&&o<=50163||50165<=o&&o<=50191||50193<=o&&o<=50219||50221<=o&&o<=50247||50249<=o&&o<=50275||50277<=o&&o<=50303||50305<=o&&o<=50331||50333<=o&&o<=50359||50361<=o&&o<=50387||50389<=o&&o<=50415||50417<=o&&o<=50443||50445<=o&&o<=50471||50473<=o&&o<=50499||50501<=o&&o<=50527||50529<=o&&o<=50555||50557<=o&&o<=50583||50585<=o&&o<=50611||50613<=o&&o<=50639||50641<=o&&o<=50667||50669<=o&&o<=50695||50697<=o&&o<=50723||50725<=o&&o<=50751||50753<=o&&o<=50779||50781<=o&&o<=50807||50809<=o&&o<=50835||50837<=o&&o<=50863||50865<=o&&o<=50891||50893<=o&&o<=50919||50921<=o&&o<=50947||50949<=o&&o<=50975||50977<=o&&o<=51003||51005<=o&&o<=51031||51033<=o&&o<=51059||51061<=o&&o<=51087||51089<=o&&o<=51115||51117<=o&&o<=51143||51145<=o&&o<=51171||51173<=o&&o<=51199||51201<=o&&o<=51227||51229<=o&&o<=51255||51257<=o&&o<=51283||51285<=o&&o<=51311||51313<=o&&o<=51339||51341<=o&&o<=51367||51369<=o&&o<=51395||51397<=o&&o<=51423||51425<=o&&o<=51451||51453<=o&&o<=51479||51481<=o&&o<=51507||51509<=o&&o<=51535||51537<=o&&o<=51563||51565<=o&&o<=51591||51593<=o&&o<=51619||51621<=o&&o<=51647||51649<=o&&o<=51675||51677<=o&&o<=51703||51705<=o&&o<=51731||51733<=o&&o<=51759||51761<=o&&o<=51787||51789<=o&&o<=51815||51817<=o&&o<=51843||51845<=o&&o<=51871||51873<=o&&o<=51899||51901<=o&&o<=51927||51929<=o&&o<=51955||51957<=o&&o<=51983||51985<=o&&o<=52011||52013<=o&&o<=52039||52041<=o&&o<=52067||52069<=o&&o<=52095||52097<=o&&o<=52123||52125<=o&&o<=52151||52153<=o&&o<=52179||52181<=o&&o<=52207||52209<=o&&o<=52235||52237<=o&&o<=52263||52265<=o&&o<=52291||52293<=o&&o<=52319||52321<=o&&o<=52347||52349<=o&&o<=52375||52377<=o&&o<=52403||52405<=o&&o<=52431||52433<=o&&o<=52459||52461<=o&&o<=52487||52489<=o&&o<=52515||52517<=o&&o<=52543||52545<=o&&o<=52571||52573<=o&&o<=52599||52601<=o&&o<=52627||52629<=o&&o<=52655||52657<=o&&o<=52683||52685<=o&&o<=52711||52713<=o&&o<=52739||52741<=o&&o<=52767||52769<=o&&o<=52795||52797<=o&&o<=52823||52825<=o&&o<=52851||52853<=o&&o<=52879||52881<=o&&o<=52907||52909<=o&&o<=52935||52937<=o&&o<=52963||52965<=o&&o<=52991||52993<=o&&o<=53019||53021<=o&&o<=53047||53049<=o&&o<=53075||53077<=o&&o<=53103||53105<=o&&o<=53131||53133<=o&&o<=53159||53161<=o&&o<=53187||53189<=o&&o<=53215||53217<=o&&o<=53243||53245<=o&&o<=53271||53273<=o&&o<=53299||53301<=o&&o<=53327||53329<=o&&o<=53355||53357<=o&&o<=53383||53385<=o&&o<=53411||53413<=o&&o<=53439||53441<=o&&o<=53467||53469<=o&&o<=53495||53497<=o&&o<=53523||53525<=o&&o<=53551||53553<=o&&o<=53579||53581<=o&&o<=53607||53609<=o&&o<=53635||53637<=o&&o<=53663||53665<=o&&o<=53691||53693<=o&&o<=53719||53721<=o&&o<=53747||53749<=o&&o<=53775||53777<=o&&o<=53803||53805<=o&&o<=53831||53833<=o&&o<=53859||53861<=o&&o<=53887||53889<=o&&o<=53915||53917<=o&&o<=53943||53945<=o&&o<=53971||53973<=o&&o<=53999||54001<=o&&o<=54027||54029<=o&&o<=54055||54057<=o&&o<=54083||54085<=o&&o<=54111||54113<=o&&o<=54139||54141<=o&&o<=54167||54169<=o&&o<=54195||54197<=o&&o<=54223||54225<=o&&o<=54251||54253<=o&&o<=54279||54281<=o&&o<=54307||54309<=o&&o<=54335||54337<=o&&o<=54363||54365<=o&&o<=54391||54393<=o&&o<=54419||54421<=o&&o<=54447||54449<=o&&o<=54475||54477<=o&&o<=54503||54505<=o&&o<=54531||54533<=o&&o<=54559||54561<=o&&o<=54587||54589<=o&&o<=54615||54617<=o&&o<=54643||54645<=o&&o<=54671||54673<=o&&o<=54699||54701<=o&&o<=54727||54729<=o&&o<=54755||54757<=o&&o<=54783||54785<=o&&o<=54811||54813<=o&&o<=54839||54841<=o&&o<=54867||54869<=o&&o<=54895||54897<=o&&o<=54923||54925<=o&&o<=54951||54953<=o&&o<=54979||54981<=o&&o<=55007||55009<=o&&o<=55035||55037<=o&&o<=55063||55065<=o&&o<=55091||55093<=o&&o<=55119||55121<=o&&o<=55147||55149<=o&&o<=55175||55177<=o&&o<=55203?10:9757==o||9977==o||9994<=o&&o<=9997||127877==o||127938<=o&&o<=127940||127943==o||127946<=o&&o<=127948||128066<=o&&o<=128067||128070<=o&&o<=128080||128110==o||128112<=o&&o<=128120||128124==o||128129<=o&&o<=128131||128133<=o&&o<=128135||128170==o||128372<=o&&o<=128373||128378==o||128400==o||128405<=o&&o<=128406||128581<=o&&o<=128583||128587<=o&&o<=128591||128675==o||128692<=o&&o<=128694||128704==o||128716==o||129304<=o&&o<=129308||129310<=o&&o<=129311||129318==o||129328<=o&&o<=129337||129341<=o&&o<=129342||129489<=o&&o<=129501?n:127995<=o&&o<=127999?14:8205==o?15:9792==o||9794==o||9877<=o&&o<=9878||9992==o||10084==o||127752==o||127806==o||127859==o||127891==o||127908==o||127912==o||127979==o||127981==o||128139==o||128187<=o&&o<=128188||128295==o||128300==o||128488==o||128640==o||128658==o?i:128102<=o&&o<=128105?s:11}return this.nextBreak=function(e,t){if(void 0===t&&(t=0),t<0)return 0;if(t>=e.length-1)return e.length;for(var r,n,i=c(o(e,t)),s=[],l=t+1;l<e.length;l++)if(n=l-1,!(55296<=(r=e).charCodeAt(n)&&r.charCodeAt(n)<=56319&&56320<=r.charCodeAt(n+1)&&r.charCodeAt(n+1)<=57343)){var d=c(o(e,l));if(a(i,s,d))return l;s.push(d)}return e.length},this.splitGraphemes=function(e){for(var t,r=[],n=0;(t=this.nextBreak(e,n))<e.length;)r.push(e.slice(n,t)),n=t;return n<e.length&&r.push(e.slice(n)),r},this.iterateGraphemes=function(e){var t=0,r={next:function(){var r,n;return(n=this.nextBreak(e,t))<e.length?(r=e.slice(t,n),t=n,{value:r,done:!1}):t<e.length?(r=e.slice(t),t=e.length,{value:r,done:!1}):{value:void 0,done:!0}}.bind(this)};return"undefined"!=typeof Symbol&&Symbol.iterator&&(r[Symbol.iterator]=function(){return r}),r},this.countGraphemes=function(e){for(var t,r=0,n=0;(t=this.nextBreak(e,n))<e.length;)n=t,r++;return n<e.length&&r++,r},this})}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n),r.d(n,{default:()=>E});const e=require("clipanion"),t=require("@yarnpkg/core"),i=require("@yarnpkg/cli"),s=require("@yarnpkg/fslib");var o,a,c,l,d,p,u,h=r(220),f=r.n(h),g=function(e,t,r,n,i){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!i)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?i.call(e,r):i?i.value=r:t.set(e,r),r},y=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};class m extends t.LightReport{constructor({configuration:e,stdout:t,json:r=!1}){super({configuration:e,stdout:t}),o.add(this),a.set(this,void 0),c.set(this,void 0),l.set(this,void 0),this.warningCount=0,g(this,a,e,"f"),g(this,c,t,"f"),g(this,l,r,"f")}static async start(e,t){const r=new this(e);try{await t(r)}catch(e){r.reportExceptionOnce(e)}finally{await r.finalize()}return r}reportSeparator(){this.reportInfo(null,"")}reportInfo(e,r){const n=y(this,o,"m",p).call(this,e),i=n?n+": ":"";y(this,l,"f")?this.reportJson({type:"info",name:e,displayName:y(this,o,"m",d).call(this,e),data:r}):y(this,c,"f").write(y(this,o,"m",u).call(this,`${t.formatUtils.pretty(y(this,a,"f"),"➤","blueBright")} ${i}${r}`,{truncate:!0})+"\n")}reportWarning(e,r){this.warningCount+=1;const n=y(this,o,"m",p).call(this,e),i=n?n+": ":"";y(this,l,"f")?this.reportJson({type:"warning",name:e,displayName:y(this,o,"m",d).call(this,e),data:r}):y(this,c,"f").write(`${t.formatUtils.pretty(y(this,a,"f"),"➤","yellowBright")} ${i}${r}`)}reportJson(e){y(this,l,"f")&&y(this,c,"f").write(y(this,o,"m",u).call(this,JSON.stringify(e),{truncate:!0})+"\n")}}function w(e,{configuration:r,json:n}){const i=function(e){return"YN"+e.toString(10).padStart(4,"0")}(null===e?0:e);return n||null!==e?i:t.formatUtils.pretty(r,i,"grey")}function v(e,t,r){return e.get("enableHyperlinks")?process.env.KONSOLE_VERSION?`]8;;${r}\\${t}]8;;\\`:`]8;;${r}${t}]8;;`:t}a=new WeakMap,c=new WeakMap,l=new WeakMap,o=new WeakSet,d=function(e){return w(e,{configuration:y(this,a,"f"),json:y(this,l,"f")})},p=function(e){return function(e,{configuration:r,json:n}){const i=w(e,{configuration:r,json:n});if(!i)return i;if(null===e||e===t.MessageName.UNNAMED)return i;const s=t.MessageName[e],o=`https://yarnpkg.com/advanced/error-codes#${i}---${s}`.toLowerCase();return v(r,i,o)}(e,{configuration:y(this,a,"f"),json:y(this,l,"f")})},u=function(e,{truncate:t=!1}={}){return y(this,a,"f").get("enableProgressBars")||(t=!1),void 0===t&&(t=y(this,a,"f").get("preferTruncatedLines")),t&&(e=f()(e,0,process.stdout.columns-1)),e};var x=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};class b extends i.BaseCommand{constructor(){super(...arguments),this.json=!1,this.moduleType="commonjs",this.withReact=!1,this.withGentype=!1,this.externalStd=!1}async execute(){const r=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:n,workspace:o}=await t.Project.find(r,this.context.cwd);if(!o)throw new i.WorkspaceRequiredError(n.cwd,this.context.cwd);if(!this.validateModuleType(this.moduleType))throw new e.UsageError('Value of --module must be "commonjs", "es6", or "es6-global"');if(!0!==this.withGentype&&!this.validateGenType(this.withGentype||"untyped"))throw new e.UsageError('Value of --use-gentype must be "typescript", "flow", or "untyped"');const a=t.structUtils.parseIdent("rescript");if(!o.dependencies.get(a.identHash)){const e=await m.start({configuration:r,stdout:this.context.stdout,json:this.json},async e=>{e.reportInfo(t.MessageName.UNNAMED,'Installing latest version of "rescript"');try{await this.tryCli(["add",this.externalStd&&"--dev","rescript"].filter(Boolean))}catch(r){return void e.reportError(t.MessageName.EXCEPTION,r.message)}if(this.withReact){e.reportSeparator(),e.reportInfo(t.MessageName.UNNAMED,'Installing latest version of "@rescript/react"');try{await this.tryCli(["add","react","react-dom","@rescript/react"])}catch(r){return void e.reportError(t.MessageName.EXCEPTION,r.message)}}if(this.externalStd){const r=!0===this.externalStd?"@rescript/std":this.externalStd;e.reportSeparator(),e.reportInfo(t.MessageName.UNNAMED,`Installing latest version of "${r}"`);try{await this.tryCli(["add",r])}catch(r){return void e.reportError(t.MessageName.EXCEPTION,r.message)}}});if(e.hasErrors())return e.exitCode();const n=t.structUtils.parseIdent("gentype"),i=o.dependencies.get(n.identHash);if(this.withGentype&&!i){const e=await m.start({configuration:r,stdout:this.context.stdout,json:this.json},async e=>{e.reportInfo(t.MessageName.UNNAMED,'Installing latest version of "gentype"');try{await this.tryCli(["add","--dev","gentype"])}catch(r){e.reportError(t.MessageName.EXCEPTION,r.message)}});if(e.hasErrors())return e.exitCode()}}const c=new s.NodeFS,l=s.ppath.join(o.cwd,"bsconfig.json");if(!await c.existsPromise(l)){const e=await m.start({configuration:r,stdout:this.context.stdout,json:this.json},async e=>{const n=this.renderConfigFile({reactJsx:this.withReact,workspaceName:t.structUtils.stringifyIdent(o.manifest.name),moduleType:this.moduleType,externalStd:this.externalStd,gentype:this.withGentype});await c.writeFilePromise(l,n),e.reportInfo(t.MessageName.UNNAMED,"Config file generated at "+v(r,"bsconfig.json",l))});if(e.hasErrors())return e.exitCode()}try{await c.mkdirpPromise(s.ppath.join(o.cwd,"src"))}catch(e){}return await this.tryCli(["res","link"]),this.cli.run(["rescript","build","-with-deps"],this.context)}async tryCli(e){if(0!==await this.cli.run(e,this.context))throw new Error(`"yarn ${e.join(" ")}" command has been failed`)}validateModuleType(e){return["es6","es6-global","commonjs"].includes(e)}validateGenType(e){return["typescript","flow","untyped"].includes(e)}renderConfigFile({reactJsx:e,workspaceName:t,moduleType:r,externalStd:n,gentype:i}){return JSON.stringify({name:t,...e&&{reason:{"react-jsx":3}},refmt:3,suffix:".bs.js",sources:[{dir:"src",subdirs:!0}],"bsc-flags":["-bs-super-errors","-bs-no-version-header"],"package-specs":[{module:r,"in-source":!0}],...n&&{"external-std":!0===n?"@rescript/std":n},"bs-dependencies":[],"bs-dev-dependencies":[],...i&&{gentypeconfig:{language:!0===i?"untyped":i,generatedFileExtension:e&&"typescript"===i?".gen.tsx":"typescript"===i?".gen.ts":".gen.js"}}},null,2)}}b.usage=e.Command.Usage({description:"Initialize ReScript for the current workspace",details:"\n      Initialize ReScript for the current workspace.\n      It will automatically install 'rescript' package, and generate `bsconfig.json`.\n      It will also install React and genType as you specify.\n    ",examples:[["Install rescript, generate bsconfig.json","yarn res init"],["Install rescript, generate bsconfig.json, prefer ES Modules output","yarn res init --module=es6"],["Install rescript and @rescript/react, generate bsconfig.json with jsx setting","yarn res init --with-react"],["Install rescript and gentype, generate bsconfig.json with gentype setting","yarn res init --with-gentype"],["Install rescript and gentype, generate bsconfig.json with gentype (TypeScript) setting","yarn res init --with-gentype=typescript"],["Install rescript as devDependencies, install external stdlib (default is @rescript/std) and generate bsconfig.json","yarn res init --with-external-std"]]}),x([e.Command.Boolean("--json",{description:"Format the output as an NDJSON stream"})],b.prototype,"json",void 0),x([e.Command.String("--module",{description:'Specify module type in ReScript complier output, can be one of "commonjs", "es6", or "es6-global" (default: "commonjs")'})],b.prototype,"moduleType",void 0),x([e.Command.Boolean("--with-react",{description:"Enable ReScript React and JSX syntax"})],b.prototype,"withReact",void 0),x([e.Command.String("--with-gentype",{description:'Enable genType, can be one of "typescript", "flow", or "untyped" (default: "untyped")',tolerateBoolean:!0})],b.prototype,"withGentype",void 0),x([e.Command.String("--with-external-std",{description:"Use external std library, and install ReScript as dev-only dependency",tolerateBoolean:!0})],b.prototype,"externalStd",void 0),x([e.Command.Path("res","init")],b.prototype,"execute",null);const j=require("@yarnpkg/plugin-pnp");var k=function(e,t,r,n){var i,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(s<3?i(o):s>3?i(t,r,o):i(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};class S extends i.BaseCommand{constructor(){super(...arguments),this.defaultFs=new s.NodeFS}async execute(){const e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:r,workspace:n}=await t.Project.find(e,this.context.cwd),o=await t.Cache.find(e);if(!n)throw new i.WorkspaceRequiredError(r.cwd,this.context.cwd);await r.restoreInstallState();const a=s.ppath.join(n.cwd,"bsconfig.json");if(!await this.defaultFs.existsPromise(a))return console.log("TODO: res init first"),1;const c=await this.defaultFs.readFilePromise(a,"utf8").then(JSON.parse),l=c["bs-dependencies"]||[],d=c["bs-dev-dependencies"]||[],p=(c["ppx-flags"]||[]).map(e=>Array.isArray(e)?e[0]:e).map(e=>{var t;return null===(t=e.match(/^@[^\/]+\/[^\/]+|^[^\/]+/))||void 0===t?void 0:t[0]}).filter(Boolean),u=c.gentypeconfig,h=await this.getRescriptPackages(["rescript",u&&"gentype",...l,...d,...p].filter(Boolean),{workspace:n,project:r,cache:o,configuration:e}),f=await t.StreamReport.start({configuration:e,stdout:this.context.stdout,json:this.json},async e=>{let n=!1;for(const e of h){const{version:i}=e,s=r.topLevelWorkspace.manifest.ensureDependencyMeta(t.structUtils.makeDescriptor(e,i));s.unplugged||(s.unplugged=!0,n=!0)}n&&(await r.topLevelWorkspace.persistManifest(),e.reportSeparator(),await r.linkEverything({cache:o,report:e,skipBuild:!1}))});if(f.hasErrors())return f.exitCode();const g=s.ppath.join(r.cwd,s.Filename.nodeModules);for(const r of h){const n=j.pnpUtils.getUnpluggedPath(r,{configuration:e}),i=t.structUtils.stringifyIdent(r),o=s.ppath.join(n,s.Filename.nodeModules,i),a=s.ppath.join(g,i);await this.defaultFs.mkdirpPromise(s.ppath.dirname(a)),await this.linkPath(this.defaultFs,o,a)}return 0}async getRescriptPackages(e,{workspace:r,project:n,configuration:i,cache:o}){const a=new Set,c=[],l=i.makeFetcher(),d=async e=>{if(a.has(e.locatorHash))return;a.add(e.locatorHash),n.tryWorkspaceByLocator(e)||c.push(e);const r=new t.ThrowReport,i=await l.fetch(e,{project:n,fetcher:l,cache:o,report:r,checksums:n.storedChecksums});try{const o=(await i.packageFs.readFilePromise(s.ppath.join(i.prefixPath,"bsconfig.json"),"utf8").then(JSON.parse).catch(()=>{})||{})["bs-dependencies"]||[];for(const r of o){const i=t.structUtils.parseIdent(r),s=e.dependencies.get(i.identHash),o=n.storedResolutions.get(s.descriptorHash);if(!o)throw new Error("Assertion failed: The resolution should have been registered");const a=n.storedPackages.get(o);if(!a)throw new Error("Assertion failed: The package should have been registered");await d(a)}}finally{i.releaseFs(),await r.finalize()}};for(const i of e){const e=t.structUtils.parseIdent(i),s=r.dependencies.get(e.identHash),o=n.storedResolutions.get(s.descriptorHash);if(!o)throw new Error("Assertion failed: The resolution should have been registered");const a=n.storedPackages.get(o);if(!a)throw new Error("Assertion failed: The package should have been registered");await d(a)}return c}async linkPath(e,t,r){try{await e.symlinkPromise(t,r)}catch(n){if("EEXIST"!==(null==n?void 0:n.code))throw n;await e.unlinkPromise(r),await this.linkPath(e,t,r)}}}S.usage=e.Command.Usage({description:"Link ReScript dependencies"}),k([e.Command.Boolean("--json",{description:"Format the output as an NDJSON stream"})],S.prototype,"json",void 0),k([e.Command.Path("res","link")],S.prototype,"execute",null);const E={hooks:{},commands:[b,S]}})(),plugin=n})();
return plugin;
}
};