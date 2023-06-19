const users = [
    {
        isim: 'Onur Akin', sorguKod: 'onrakn', projeDurumYuzde: 98, tahminiKalanGun: 2, ProjeCalisanSayisi: 2,
        Sorunlar: ["-"],
        Yapilacaklar: ['>Ses Sistemi', '>Ses Dili entegresi'],
        buGunYapilanlar: ['-'],
        YapimdaOlanlar: ['-'],
        teknikDetaylar: ['Proje Boyutu : 22.7GB',"Proje exe boyutu : 1.52 GB (değişecek)","Motor ve Motor sürümü : Unreal Engine 5.2 - 5.1 Entegre"]
    },
    {
        isim: 'Nevzat Ulu Bulut', sorguKod: 'nvztblt', projeDurumYuzde: 47.8, tahminiKalanGun: 15, ProjeCalisanSayisi: 3,
        Sorunlar: [">Unreal Engine 5 motor sorunu [önemli]"],
        Yapilacaklar: [">Özel widget efekleri",">40 bölüm"],
        buGunYapilanlar: ['>Menü',">Google ADS eklentisi"],
        YapimdaOlanlar: ['>40 bölüm',">Özel widget efekleri",">Dinamik Level Sistemi"],
        teknikDetaylar: ['Proje Boyutu : 1.8GB',"Proje exe boyutu : bilinmiyor","Motor ve Motor sürümü : Unreal Engine 5.2 - 5.1 Entegre"]
    },
    {
        isim: 'Barış Esen', sorguKod: 'brs5000', projeDurumYuzde: 99 , tahminiKalanGun: 1, ProjeCalisanSayisi: 1,
        Sorunlar: ["-"],
        Yapilacaklar: ["-"],
        buGunYapilanlar: ["-"],
        YapimdaOlanlar: ["-"],
        teknikDetaylar: ['Proje Boyutu : 5.3GB',"Proje exe boyutu : 0.164GB","Motor ve Motor sürümü : Unreal Engine 5.2 - 5.1 Entegre"]
    }


]

let projectInformationFound = {};
projectInformationFound.projeDurumYuzde = 0;

function getInfo(sorguKod) {
    var searchInfo = users.filter(x => x.sorguKod == sorguKod);
    var x = document.getElementById('search-content');
    if (searchInfo.length > 0) {
        x.classList.add('display-none');
        projectInformationFound = searchInfo[0];
        fillInfoWrapper();
    }
    else
    {
        var y = document.getElementById('errormsg');
        y.classList.add('display-block');
    }

}

function fillInfoWrapper() {

    var y = document.getElementById('info-wrapper');
    y.classList.add('display-block');

    y.innerHTML += `
    
    <p>Merhaba,<b>${projectInformationFound.isim} </b> İşte Projenin Son Durumu</p>
   <div class="row">
    <div class="column">
        <p style="font-weight: 500;">Proje Durum Yüzdesi</p>
        <div>
            <canvas id="myChart"></canvas>
          </div>
        <p style="font-weight: 500;">Teknik Özellikler</p>
        <div class="list">
        ${projectInformationFound.teknikDetaylar.map(item =>
        ` <div class="list-item">${item} <i class="fa-sharp fa-solid fa-asterisk"></i></div>`
    ).join("")}
        </div>
        <p style="font-weight: 500;">Tahmini Kalan Süre : <b>${projectInformationFound.tahminiKalanGun}</b> Gün</p>
    </div>
    <div class="column">
    <p style="font-weight: 500;">Proje İçin Çalışan Sayısı : <b>${projectInformationFound.ProjeCalisanSayisi}</b></p>

    <p style="font-weight: 500;">Bu Gün Yapılanlar</p>
    <div class="list">
    ${projectInformationFound.buGunYapilanlar.map(item =>
        ` <div class="list-item">${item} <i class="fa-solid fa-check"></i></div>`
    ).join("")}
    </div>

    <p style="font-weight: 500;">Yapımda Olanlar</p>
    <div class="list">
    ${projectInformationFound.YapimdaOlanlar.map(item =>
        ` <div class="list-item">${item} <i class="fa-solid fa-spinner loader-animation"></i></i></div>`
    ).join("")}
    </div>


        <p style="font-weight: 500;">Yapılacaklar</p>
        <div class="list">
        ${projectInformationFound.Yapilacaklar.map(item =>
        ` <div class="list-item">${item} <i class="fa-sharp fa-solid fa-list-check"></i></div>`
    ).join("")}
        </div>

        <p style="font-weight: 500;">Sorunlar</p>
        <div class="list">
        ${projectInformationFound.Sorunlar.map(item =>
        ` <div class="list-item">${item} <i class="fa-sharp fa-solid fa-circle-exclamation"></i></div>`
    ).join("")}
        </div>
    </div>
    
    `

    getChart();

}


function getChart() {
    if (projectInformationFound.projeDurumYuzde == null) {
        projectInformationFound.projeDurumYuzde = 0;
    }
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Tamamlanan',
                'Kalan',
            ],
            datasets: [{
                label: '%',
                data: [
                    projectInformationFound.projeDurumYuzde,
                    100 - projectInformationFound.projeDurumYuzde],
                backgroundColor: [
                    '#00DFA2',
                    '#E8AA42',
                ],
                hoverOffset: 4
            }]
        },
    });
}
getChart();

var kx = document.getElementById('sorgukod');
kx.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
        getInfo(kx.value);
    }
  });



