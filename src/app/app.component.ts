import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Network, DataSet } from 'vis-network';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  network: Network;
  @ViewChild('network', { static: true }) networkContainer: ElementRef;

  ngOnInit() {
    var data = {
      nodes: [
        {
          name: 'Rahul Gandhi',
          screenName: 'RahulGandhi',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'data:image/jpeg;base64,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',
          p: '0',
          id: '3171712086',
        },
        {
          name: 'DD NEWS JAMMU',
          screenName: 'ddnews_jammu',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1277911074608578561/h7uZhm0F_normal.jpg',
          p: '1',
          id: '1032883844855345152',
        },
        {
          name: 'Jehlum Post',
          screenName: 'jehlumpost',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/478578440036044800/4_LbFym3_normal.jpeg',
          p: '1',
          id: '108004751',
        },
        {
          name: 'South Kashmir',
          screenName: 'southKashmir24',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1344608871629746182/2SXhwP7J_normal.jpg',
          p: '1',
          id: '1107162061363011584',
        },
        {
          name: 'Live Law',
          screenName: 'LiveLawIndia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/897707258334916608/nMQWwGlo_normal.jpg',
          p: '1',
          id: '1255161552',
        },
        {
          name: 'DD NEWS SRINAGAR',
          screenName: 'ddnewsSrinagar',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1298577593285804034/mKHjGFCL_normal.jpg',
          p: '1',
          id: '1266621060',
        },
        {
          name: 'The Times Of India',
          screenName: 'timesofindia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1129666669054324736/1W_E72cn_normal.png',
          p: '1',
          id: '134758540',
        },
        {
          name: 'The Telegraph',
          screenName: 'ttindia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1277634913701785600/w7H4CCF4_normal.png',
          p: '1',
          id: '141080858',
        },
        {
          name: 'IANS Tweets',
          screenName: 'ians_india',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1253350197876396032/xOBFeu-C_normal.jpg',
          p: '1',
          id: '141584822',
        },
        {
          name: 'Business Today',
          screenName: 'BT_India',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1014506276322205696/u7_fHVM7_normal.jpg',
          p: '1',
          id: '161318053',
        },
        {
          name: 'JandK Headlines',
          screenName: 'jandkheadlines',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1338729594484977666/63v8ne0O_normal.jpg',
          p: '1',
          id: '174954171',
        },
        {
          name: 'The RealKashmir News',
          screenName: 'TheRealKashmir_',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1340996990956519424/NvmsLCni_normal.jpg',
          p: '1',
          id: '1883472235',
        },
        {
          name: 'IndiaToday',
          screenName: 'IndiaToday',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1303193863775895552/sEOiKTvO_normal.jpg',
          p: '1',
          id: '19897138',
        },
        {
          name: 'NewsX',
          screenName: 'NewsX',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1242030796442984448/P-WgQ5Eg_normal.jpg',
          p: '1',
          id: '23405846',
        },
        {
          name: 'TIMES NOW',
          screenName: 'TimesNow',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1295231274366509057/ip_k3ncs_normal.jpg',
          p: '1',
          id: '240649814',
        },
        {
          name: 'National Herald',
          screenName: 'NH_India',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/865440783444320259/LDZkKH5F_normal.jpg',
          p: '1',
          id: '2590835076',
        },
        {
          name: 'Junaid Bhat Photogra',
          screenName: 'Junaidbhatphoto',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1256124313968742400/i2uHzr1C_normal.jpg',
          p: '1',
          id: '2592788244',
        },
        {
          name: 'Jeremy Koh',
          screenName: 'JeremyKohCNA',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1154596205617270785/9uSaqvW8_normal.jpg',
          p: '1',
          id: '2597571661',
        },
        {
          name: 'Jkupdate',
          screenName: 'jkupdate',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/772697126623150080/Ss2C2nda_normal.jpg',
          p: '1',
          id: '2604966848',
        },
        {
          name: 'AIR News Jammu',
          screenName: 'radionews_jammu',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1254238785501491200/EvJaP-0p_normal.jpg',
          p: '1',
          id: '2919311094',
        },
        {
          name: 'IPS Association',
          screenName: 'IPS_Association',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1121734967803777024/8o3Y6nxr_normal.jpg',
          p: '1',
          id: '3041294294',
        },
        {
          name: 'The Tribune',
          screenName: 'thetribunechd',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/571293278281007104/a9uLp3Ae_normal.jpeg',
          p: '1',
          id: '3046490198',
        },
        {
          name: 'Ashraf Wani اشرف وان',
          screenName: 'ashraf_wani',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1330847380581670912/qMfcvqVX_normal.jpg',
          p: '1',
          id: '369528920',
        },
        {
          name: 'AajTak',
          screenName: 'aajtak',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1179039747273940992/ZGQ_ibsP_normal.jpg',
          p: '1',
          id: '42606652',
        },
        {
          name: 'Ajay Pal Natt (Troll',
          screenName: 'ajaypalnat',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1343589786913632256/22ce6p3x_normal.jpg',
          p: '1',
          id: '428437595',
        },
        {
          name: 'Business Standard',
          screenName: 'bsindia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1194080296821559296/4GUNRuCM_normal.jpg',
          p: '1',
          id: '43855487',
        },
        {
          name: 'National Skillindia',
          screenName: 'NSIM2015',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/672713616022306816/8erdYKkz_normal.png',
          p: '1',
          id: '4451495718',
        },
        {
          name: 'Guftar Ahmed (گفتار ',
          screenName: 'GuftarAhmedCh',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1309123630035611651/X__PEIsT_normal.jpg',
          p: '1',
          id: '447626422',
        },
        {
          name: 'Early Times Jammu',
          screenName: 'earlytimesjk',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/980370680435920896/r8FKSN8F_normal.jpg',
          p: '1',
          id: '543288708',
        },
        {
          name: 'The Cynic',
          screenName: 'Gen_Chohan',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1342479455915151360/Q4cniill_normal.jpg',
          p: '1',
          id: '550752797',
        },
        {
          name: 'CNNNews18',
          screenName: 'CNNnews18',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1162229007439421440/k_CbYqJm_normal.jpg',
          p: '1',
          id: '6509832',
        },
        {
          name: 'Maj Gen (Dr)GD Baksh',
          screenName: 'GeneralBakshi',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/2699212062/bf91ff95359bf22be76faa3fc96a6abd_normal.jpeg',
          p: '1',
          id: '870366536',
        },
        {
          name: 'Sun Weidong',
          screenName: 'China_Amb_India',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1153190660800860160/uUDDGiDG_normal.png',
          p: '1',
          id: '938072041273430017',
        },
        {
          name: 'Mumbai Mirror',
          screenName: 'MumbaiMirror',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/602018423887953920/JxUnVH5l_normal.jpg',
          p: '1',
          id: '990761677',
        },
        {
          name: 'AajTak',
          screenName: 'aajtak',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1351381496238493698/lAMcbaW3_normal.jpg',
          p: '1',
          id: 'aajtak',
        },
        {
          name: 'Ajay Pal Natt (Troll',
          screenName: 'ajaypalnat',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1343589786913632256/22ce6p3x_normal.jpg',
          p: '1',
          id: 'ajaypalnat',
        },
        {
          name: 'Ashraf Wani اشرف وان',
          screenName: 'ashraf_wani',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1330847380581670912/qMfcvqVX_normal.jpg',
          p: '1',
          id: 'ashraf_wani',
        },
        {
          name: 'Business Standard',
          screenName: 'bsindia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1194080296821559296/4GUNRuCM_normal.jpg',
          p: '1',
          id: 'bsindia',
        },
        {
          name: 'Business Today',
          screenName: 'BT_India',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1014506276322205696/u7_fHVM7_normal.jpg',
          p: '1',
          id: 'BT_India',
        },
        {
          name: 'Sun Weidong',
          screenName: 'China_Amb_India',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1153190660800860160/uUDDGiDG_normal.png',
          p: '1',
          id: 'China_Amb_India',
        },
        {
          name: 'News18',
          screenName: 'CNNnews18',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1162229007439421440/k_CbYqJm_normal.jpg',
          p: '1',
          id: 'CNNnews18',
        },
        {
          name: 'DD NEWS SRINAGAR',
          screenName: 'ddnewsSrinagar',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1298577593285804034/mKHjGFCL_normal.jpg',
          p: '1',
          id: 'ddnewsSrinagar',
        },
        {
          name: 'DD NEWS JAMMU',
          screenName: 'ddnews_jammu',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1277911074608578561/h7uZhm0F_normal.jpg',
          p: '1',
          id: 'ddnews_jammu',
        },
        {
          name: 'Early Times Jammu',
          screenName: 'earlytimesjk',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/980370680435920896/r8FKSN8F_normal.jpg',
          p: '1',
          id: 'earlytimesjk',
        },
        {
          name: 'Maj Gen (Dr)GD Baksh',
          screenName: 'GeneralBakshi',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/2699212062/bf91ff95359bf22be76faa3fc96a6abd_normal.jpeg',
          p: '1',
          id: 'GeneralBakshi',
        },
        {
          name: 'The Cynic',
          screenName: 'Gen_Chohan',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1342479455915151360/Q4cniill_normal.jpg',
          p: '1',
          id: 'Gen_Chohan',
        },
        {
          name: 'Guftar Ahmed (گفتار ',
          screenName: 'GuftarAhmedCh',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1309123630035611651/X__PEIsT_normal.jpg',
          p: '1',
          id: 'GuftarAhmedCh',
        },
        {
          name: 'IANS Tweets',
          screenName: 'ians_india',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1253350197876396032/xOBFeu-C_normal.jpg',
          p: '1',
          id: 'ians_india',
        },
        {
          name: 'IndiaToday',
          screenName: 'IndiaToday',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1323664537770323968/vD4Ifa_b_normal.jpg',
          p: '1',
          id: 'IndiaToday',
        },
        {
          name: 'IPS Association',
          screenName: 'IPS_Association',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1121734967803777024/8o3Y6nxr_normal.jpg',
          p: '1',
          id: 'IPS_Association',
        },
        {
          name: 'JandK Headlines',
          screenName: 'jandkheadlines',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1338729594484977666/63v8ne0O_normal.jpg',
          p: '1',
          id: 'jandkheadlines',
        },
        {
          name: 'Jehlum Post',
          screenName: 'jehlumpost',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/478578440036044800/4_LbFym3_normal.jpeg',
          p: '1',
          id: 'jehlumpost',
        },
        {
          name: 'Jeremy Koh',
          screenName: 'JeremyKohCNA',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1154596205617270785/9uSaqvW8_normal.jpg',
          p: '1',
          id: 'JeremyKohCNA',
        },
        {
          name: 'Jkupdate',
          screenName: 'jkupdate',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/772697126623150080/Ss2C2nda_normal.jpg',
          p: '1',
          id: 'jkupdate',
        },
        {
          name: 'Junaid Bhat Photogra',
          screenName: 'Junaidbhatphoto',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1256124313968742400/i2uHzr1C_normal.jpg',
          p: '1',
          id: 'Junaidbhatphoto',
        },
        {
          name: 'Live Law',
          screenName: 'LiveLawIndia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/897707258334916608/nMQWwGlo_normal.jpg',
          p: '1',
          id: 'LiveLawIndia',
        },
        {
          name: 'Mumbai Mirror',
          screenName: 'MumbaiMirror',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/602018423887953920/JxUnVH5l_normal.jpg',
          p: '1',
          id: 'MumbaiMirror',
        },
        {
          name: 'NewsX',
          screenName: 'NewsX',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1242030796442984448/P-WgQ5Eg_normal.jpg',
          p: '1',
          id: 'NewsX',
        },
        {
          name: 'National Herald',
          screenName: 'NH_India',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/865440783444320259/LDZkKH5F_normal.jpg',
          p: '1',
          id: 'NH_India',
        },
        {
          name: 'National Skillindia',
          screenName: 'NSIM2015',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/672713616022306816/8erdYKkz_normal.png',
          p: '1',
          id: 'NSIM2015',
        },
        {
          name: 'AIR News Jammu',
          screenName: 'radionews_jammu',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1254238785501491200/EvJaP-0p_normal.jpg',
          p: '1',
          id: 'radionews_jammu',
        },
        {
          name: 'South Kashmir',
          screenName: 'southKashmir24',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1344608871629746182/2SXhwP7J_normal.jpg',
          p: '1',
          id: 'southKashmir24',
        },
        {
          name: 'The RealKashmir News',
          screenName: 'TheRealKashmir_',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1340996990956519424/NvmsLCni_normal.jpg',
          p: '1',
          id: 'TheRealKashmir_',
        },
        {
          name: 'The Tribune',
          screenName: 'thetribunechd',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/571293278281007104/a9uLp3Ae_normal.jpeg',
          p: '1',
          id: 'thetribunechd',
        },
        {
          name: 'TIMES NOW',
          screenName: 'TimesNow',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1295231274366509057/ip_k3ncs_normal.jpg',
          p: '1',
          id: 'TimesNow',
        },
        {
          name: 'The Times Of India',
          screenName: 'timesofindia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1129666669054324736/1W_E72cn_normal.png',
          p: '1',
          id: 'timesofindia',
        },
        {
          name: 'The Telegraph',
          screenName: 'ttindia',
          c: '0',
          s: '0',
          shape: 'image',
          image:
            'http://pbs.twimg.com/profile_images/1277634913701785600/w7H4CCF4_normal.png',
          p: '1',
          id: 'ttindia',
        },
      ],
      edges: [
        {
          from: 'RahulGandhi',
          to: 'ddnews_jammu',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'jehlumpost',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'southKashmir24',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'LiveLawIndia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ddnewsSrinagar',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'timesofindia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ttindia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ians_india',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'BT_India',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'jandkheadlines',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'TheRealKashmir_',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'IndiaToday',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'NewsX',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'TimesNow',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'NH_India',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'Junaidbhatphoto',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'JeremyKohCNA',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'jkupdate',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'radionews_jammu',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'IPS_Association',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'thetribunechd',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ashraf_wani',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'aajtak',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ajaypalnat',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'bsindia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'NSIM2015',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'GuftarAhmedCh',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'earlytimesjk',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'Gen_Chohan',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'CNNnews18',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'GeneralBakshi',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'China_Amb_India',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'MumbaiMirror',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'aajtak',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ajaypalnat',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ashraf_wani',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'bsindia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'BT_India',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'China_Amb_India',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'CNNnews18',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ddnewsSrinagar',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ddnews_jammu',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'earlytimesjk',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'GeneralBakshi',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'Gen_Chohan',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'GuftarAhmedCh',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ians_india',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'IndiaToday',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'IPS_Association',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'jandkheadlines',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'jehlumpost',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'JeremyKohCNA',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'jkupdate',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'Junaidbhatphoto',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'LiveLawIndia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'MumbaiMirror',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'NewsX',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'NH_India',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'NSIM2015',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'radionews_jammu',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'southKashmir24',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'TheRealKashmir_',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'thetribunechd',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'TimesNow',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'timesofindia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'ttindia',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'RahulGandhi',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'RahulGandhi',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'RahulGandhi',
          value: 'follower',
        },
        {
          from: 'RahulGandhi',
          to: 'RahulGandhi',
          value: 'follower',
        },
      ],
    };
    var options = {
      nodes: {
        borderWidth: 0,
        size: 30,
        color: {
          border: '#406897',
          background: '#6AAFFF',
        },
        font: { color: '#eeeeee' },
        shapeProperties: {
          useBorderWithshape: 'image',
          image: true,
        },
      },
      edges: {
        color: 'lightgray',
      },
    };
    var nodes = data.nodes;
    var links = data.edges;
    var mData = {
      nodes: nodes,
      edges: links,
    };
    this.network = new Network(
      this.networkContainer.nativeElement,
      mData,
      options
    );
  }
}
