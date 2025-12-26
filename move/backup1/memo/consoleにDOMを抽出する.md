$('.Box-sc-g0xbh4-0').each(function() {    var text = $(this).text();    console.log(text);});

$('.Box-sc-g0xbh4-0.gwACeB.prc-Link-Link-85e08').each(function() {    var text = $(this).text();    console.log(text);});

document.querySelectorAll('.Box-sc-g0xbh4-0.gwACeB.prc-Link-Link-85e08').forEach(function(element) {
    var text = element.textContent;
    console.log(text);
});


var MyjQuery= document.createElement('script');
MyjQuery.src = "https://code.jquery.com/jquery-3.7.1.min.js";
document.getElementsByTagName('head')[0].appendChild(MyjQuery);
jQuery.noConflict(); // test it

<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

->CSPエラー

const nodelist = document.querySelectorAll(".Box-sc-g0xbh4-0.gwACeB.prc-Link-Link-85e08");
for (const node of nodelist) {
    alert(node.textContent);
}

OK
const nodelist = document.querySelectorAll(".Box-sc-g0xbh4-0.gwACeB.prc-Link-Link-85e08");
let stringArray = [];
for (const node of nodelist) {
    stringArray.push(node.textContent);
}
// コンソールに情報をログ出力
console.log(stringArray.join('\n'));

src/configs/routings.ts
src/configs/routings-redirect-from-old-web.ts
keel_configuration.yaml
manifests/overlays/pool/virtual_service.yaml
manifests/overlays/production/virtual_service.yaml
test/integration/redirect-fixtures.ts
manifests/overlays/test/virtual_service.yaml


NG
event.clipboardData.setData("text/plain", node.textContent);
event.preventDefault();
document.execCommand("copy");
