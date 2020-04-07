/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {


var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

var orthoProj = new am4maps.projections.Orthographic();
var millerProj = new am4maps.projections.Miller();

chart.geodata = am4geodata_worldLow;
chart.projection = orthoProj;
chart.deltaLatitude = -30;
chart.panBehavior = "rotateLongLat";
chart.marginTop = 20;
chart.marginBottom = 20;
// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();


chart.adapter.add("deltaLatitude", function(delatLatitude){
    return am4core.math.fitToRange(delatLatitude, -90, 90);
})

var grid = chart.series.push(new am4maps.GraticuleSeries());
grid.toBack();

grid.fitExtent = false;
var title = chart.chartContainer.createChild(am4core.Label);
title.text = "Population";
title.fontSize = 20;
title.paddingTop = 30;
title.align = "center";
title.zIndex = 100;

var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}";
polygonSeries.heatRules.push({
  property: "fill",
  target: polygonSeries.mapPolygons.template,
  min: am4core.color("#ffffff"),
  max: am4core.color("#AAAA00")
});
polygonSeries.useGeodata = true;

// add heat legend
var heatLegend = chart.chartContainer.createChild(am4maps.HeatLegend);
heatLegend.valign = "bottom";
heatLegend.align = "left";
heatLegend.width = am4core.percent(100);
heatLegend.series = polygonSeries;
heatLegend.orientation = "horizontal";
heatLegend.padding(20, 20, 20, 20);
heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
heatLegend.valueAxis.renderer.minGridDistance = 40;

polygonSeries.mapPolygons.template.events.on("over", event => {
  handleHover(event.target);
});

polygonSeries.mapPolygons.template.events.on("hit", event => {
  handleHover(event.target);
});

function handleHover(mapPolygon) {
  if (!isNaN(mapPolygon.dataItem.value)) {
    heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
  } else {
    heatLegend.valueAxis.hideTooltip();
  }
}

polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
polygonSeries.mapPolygons.template.events.on("out", event => {
  heatLegend.valueAxis.hideTooltip();
});

chart.zoomControl = new am4maps.ZoomControl();
chart.zoomControl.valign = "top";

/*var popData = [
{ id: "AF", value: 36643815 },
{ id: "AL", value: 3074579 },
{ id: "DZ", value: 42972878 },
{ id: "AS", value: 49437 },
{ id: "AD", value: 77000 },
{ id: "AO", value: 32522339 },
{ id: "AI", value: 18090 },
{ id: "AG", value: 98179 },
{ id: "AR", value: 45479118 },
{ id: "AM", value: 3021324 },
{ id: "AW", value: 119428 },
{ id: "AU", value: 25466459 },
{ id: "AT", value: 8859449 },
{ id: "AZ", value: 10205810 },
{ id: "BS", value: 337721 },
{ id: "BH", value: 1505003 },
{ id: "BD", value: 162650853 },
{ id: "BB", value: 294560 },
{ id: "BY", value: 9477918 },
{ id: "BE", value: 11720716 },
{ id: "BZ", value: 399598 },
{ id: "BJ", value: 12864634 },
{ id: "BM", value: 71750 },
{ id: "BT", value: 782318 },
{ id: "BO", value: 11639909 },
{ id: "BA", value: 3835586 },
{ id: "BW", value: 2317233 },
{ id: "BR", value: 211715973 },
{ id: "VG", value: 37381 },
{ id: "BN", value: 464478 },
{ id: "BG", value: 6966899 },
{ id: "BF", value: 20835401 },
{ id: "MM", value: 56590071 },
{ id: "BI", value: 11865821 },
{ id: "CV", value: 583255 },
{ id: "KH", value: 16926984 },
{ id: "CM", value: 27744989 },
{ id: "CA", value: 37694085 },
{ id: "KY", value: 61944 },
{ id: "CF", value: 5990855 },
{ id: "TD", value: 16877357 },
{ id: "CL", value: 18186770 },
{ id: "CN", value: 1394015977 },
{ id: "CO", value: 49084841 },
{ id: "KM", value: 846281 },
{ id: "CD", value: 101780263 },
{ id: "CG", value: 5293070 },
{ id: "CK", value: 8574 },
{ id: "CR", value: 5097988 },
{ id: "CI", value: 27481086 },
{ id: "HR", value: 4227746 },
{ id: "CU", value: 11059062 },
{ id: "CW", value: 151345 },
{ id: "CY", value: 1266676 },
{ id: "CZ", value: 10702498 },
{ id: "DK", value: 5869410 },
{ id: "DJ", value: 921804 },
{ id: "DM", value: 74243 },
{ id: "DO", value: 10499707 },
{ id: "EC", value: 16904867 },
{ id: "EG", value: 104124440 },
{ id: "SV", value: 6481102 },
{ id: "GQ", value: 836178 },
{ id: "ER", value: 6081196 },
{ id: "EE", value: 1228624 },
{ id: "SZ", value: 1104479 },
{ id: "ET", value: 108113150 },
{ id: "FO", value: 51628 },
{ id: "FJ", value: 935974 },
{ id: "FI", value: 5571665 },
{ id: "FR", value: 67848156 },
{ id: "PF", value: 295121 },
{ id: "GA", value: 2230908 },
{ id: "GM", value: 2173999 },
{ id: "PS", value: 1918221 },
{ id: "GE", value: 3997000 },
{ id: "DE", value: 80159662 },
{ id: "GH", value: 29340248 },
{ id: "GI", value: 29581 },
{ id: "GR", value: 10607051 },
{ id: "GL", value: 57616 },
{ id: "GD", value: 113094 },
{ id: "GU", value: 168485 },
{ id: "GT", value: 17153288 },
{ id: "GG", value: 67052 },
{ id: "GN", value: 12527440 },
{ id: "GW", value: 1927104 },
{ id: "GY", value: 750204 },
{ id: "HT", value: 11067777 },
{ id: "HN", value: 9235340 },
{ id: "HK", value: 7249907 },
{ id: "HU", value: 9771827 },
{ id: "IS", value: 350734 },
{ id: "IN", value: 1326093247 },
{ id: "ID", value: 267026366 },
{ id: "IR", value: 84923314 },
{ id: "IQ", value: 38872655 },
{ id: "IE", value: 5176569 },
{ id: "IM", value: 90499 },
{ id: "IL", value: 8675475 },
{ id: "IT", value: 62402659 },
{ id: "JM", value: 2808570 },
{ id: "JP", value: 125507472 },
{ id: "JE", value: 101073 },
{ id: "JO", value: 10820644 },
{ id: "KZ", value: 19091949 },
{ id: "KE", value: 53527936 },
{ id: "KI", value: 111796 },
{ id: "KP", value: 25643466 },
{ id: "KR", value: 51835110 },
{ id: "XK", value: 1932774 },
{ id: "KW", value: 2993706 },
{ id: "KG", value: 5964897 },
{ id: "LA", value: 7447396 },
{ id: "LV", value: 1881232 },
{ id: "LB", value: 5469612 },
{ id: "LS", value: 1969334 },
{ id: "LR", value: 5073296 },
{ id: "LY", value: 6890535 },
{ id: "LI", value: 39137 },
{ id: "LT", value: 2731464 },
{ id: "LU", value: 628381 },
{ id: "MO", value: 614458 },
{ id: "MG", value: 26955737 },
{ id: "MW", value: 21196629 },
{ id: "MY", value: 32652083 },
{ id: "MV", value: 391904 },
{ id: "ML", value: 19553397 },
{ id: "MT", value: 457267 },
{ id: "MH", value: 77917 },
{ id: "MR", value: 4005475 },
{ id: "MU", value: 1379365 },
{ id: "MX", value: 128649565 },
{ id: "FM", value: 102436 },
{ id: "MD", value: 3364496 },
{ id: "MC", value: 39000 },
{ id: "MN", value: 3168026 },
{ id: "ME", value: 609859 },
{ id: "MS", value: 5373 },
{ id: "MA", value: 35561654 },
{ id: "MZ", value: 30098197 },
{ id: "NA", value: 2630073 },
{ id: "NR", value: 11000 },
{ id: "NP", value: 30327877 },
{ id: "NL", value: 17280397 },
{ id: "NC", value: 290009 },
{ id: "NZ", value: 4925477 },
{ id: "NI", value: 6203441 },
{ id: "NE", value: 22772361 },
{ id: "NG", value: 214028302 },
{ id: "MK", value: 2125971 },
{ id: "MP", value: 51433 },
{ id: "NO", value: 5467439 },
{ id: "OM", value: 4664844 },
{ id: "PK", value: 233500636 },
{ id: "PW", value: 21685 },
{ id: "PA", value: 3894082 },
{ id: "PG", value: 7259456 },
{ id: "PY", value: 7191685 },
{ id: "PE", value: 31914989 },
{ id: "PH", value: 109180815 },
{ id: "PL", value: 38282325 },
{ id: "PT", value: 10302674 },
{ id: "PR", value: 3189068 },
{ id: "QA", value: 2444174 },
{ id: "RO", value: 21302893 },
{ id: "RU", value: 141722205 },
{ id: "RW", value: 12712431 },
{ id: "BL", value: 7122 },
{ id: "SH", value: 7862 },
{ id: "KN", value: 53821 },
{ id: "LC", value: 166487 },
{ id: "MF", value: 32556 },
{ id: "PM", value: 5347 },
{ id: "VC", value: 101390 },
{ id: "WS", value: 203774 },
{ id: "SM", value: 34232 },
{ id: "ST", value: 211122 },
{ id: "SA", value: 34173498 },
{ id: "SN", value: 15736368 },
{ id: "RS", value: 7012165 },
{ id: "SC", value: 95981 },
{ id: "SL", value: 6624933 },
{ id: "SG", value: 6209660 },
{ id: "SX", value: 43847 },
{ id: "SK", value: 5440602 },
{ id: "SI", value: 2102678 },
{ id: "SB", value: 685097 },
{ id: "SO", value: 11757124 },
{ id: "ZA", value: 56463617 },
{ id: "SS", value: 10561244 },
{ id: "ES", value: 50015792 },
{ id: "LK", value: 22889201 },
{ id: "SD", value: 45561556 },
{ id: "SR", value: 609569 },
{ id: "SE", value: 10202491 },
{ id: "CH", value: 8403994 },
{ id: "SY", value: 19398448 },
{ id: "TW", value: 23603049 },
{ id: "TJ", value: 8873669 },
{ id: "TZ", value: 58552845 },
{ id: "TH", value: 68977400 },
{ id: "TL", value: 1383723 },
{ id: "TG", value: 8608444 },
{ id: "TO", value: 106095 },
{ id: "TT", value: 1208789 },
{ id: "TN", value: 11721177 },
{ id: "TR", value: 82017514 },
{ id: "TM", value: 5528627 },
{ id: "TC", value: 55926 },
{ id: "TV", value: 11342 },
{ id: "UG", value: 43252966 },
{ id: "UA", value: 43922939 },
{ id: "AE", value: 9992083 },
{ id: "GB", value: 65761117 },
{ id: "US", value: 332639102 },
{ id: "UY", value: 3387605 },
{ id: "UZ", value: 30565411 },
{ id: "VU", value: 298333 },
{ id: "VE", value: 28644603 },
{ id: "VN", value: 98721275 },
{ id: "VI", value: 106235 },
{ id: "WF", value: 15854 },
{ id: "PS", value: 2900034 },
{ id: "EH", value: 652271 },
{ id: "YE", value: 29884405 },
{ id: "ZM", value: 17426623 },
{ id: "ZW", value: 14546314 }

];*/

var popData = [
  { id: "AF", value: 36643815, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AF-flag.gif" },
  { id: "AL", value: 3074579, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AL-flag.gif" },
  { id: "DZ", value: 42972878, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/DZ-flag.gif" },
  { id: "AS", value: 49437, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AS-flag.gif" },
  { id: "AD", value: 77000, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AD-flag.gif" },
  { id: "AO", value: 32522339, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AO-flag.gif" },
  { id: "AI", value: 18090, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AI-flag.gif" },
  { id: "AG", value: 98179, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AG-flag.gif" },
  { id: "AR", value: 45479118, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AR-flag.gif" },
  { id: "AM", value: 3021324, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AM-flag.gif" },
  { id: "AW", value: 119428, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AW-flag.gif" },
  { id: "AU", value: 25466459, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AU-flag.gif" },
  { id: "AT", value: 8859449, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AT-flag.gif" },
  { id: "AZ", value: 10205810, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AZ-flag.gif" },
  { id: "BS", value: 337721, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BS-flag.gif" },
  { id: "BH", value: 1505003, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BH-flag.gif" },
  { id: "BD", value: 162650853, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BD-flag.gif" },
  { id: "BB", value: 294560, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BB-flag.gif" },
  { id: "BY", value: 9477918, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BY-flag.gif" },
  { id: "BE", value: 11720716, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BE-flag.gif" },
  { id: "BZ", value: 399598, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BZ-flag.gif" },
  { id: "BJ", value: 12864634, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BJ-flag.gif" },
  { id: "BM", value: 71750, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BM-flag.gif" },
  { id: "BT", value: 782318, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BT-flag.gif" },
  { id: "BO", value: 11639909, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BO-flag.gif" },
  { id: "BA", value: 3835586, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BA-flag.gif" },
  { id: "BW", value: 2317233, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BW-flag.gif" },
  { id: "BR", value: 211715973, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BR-flag.gif" },
  { id: "VG", value: 37381, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/VG-flag.gif" },
  { id: "BN", value: 464478, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BN-flag.gif" },
  { id: "BG", value: 6966899, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BG-flag.gif" },
  { id: "BF", value: 20835401, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BF-flag.gif" },
  { id: "MM", value: 56590071, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MM-flag.gif" },
  { id: "BI", value: 11865821, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/BI-flag.gif" },
  { id: "CV", value: 583255, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CV-flag.gif" },
  { id: "KH", value: 16926984, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KH-flag.gif" },
  { id: "CM", value: 27744989, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CM-flag.gif" },
  { id: "CA", value: 37694085, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CA-flag.gif" },
  { id: "KY", value: 61944, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KY-flag.gif" },
  { id: "CF", value: 5990855, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CF-flag.gif" },
  { id: "TD", value: 16877357, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TD-flag.gif" },
  { id: "CL", value: 18186770, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CL-flag.gif" },
  { id: "CN", value: 1394015977, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CN-flag.gif" },
  { id: "CO", value: 49084841, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CO-flag.gif" },
  { id: "KM", value: 846281, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KM-flag.gif" },
  { id: "CD", value: 101780263, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CD-flag.gif" },
  { id: "CG", value: 5293070, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CG-flag.gif" },
  { id: "CK", value: 8574, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CK-flag.gif" },
  { id: "CR", value: 5097988, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CR-flag.gif" },
  { id: "CI", value: 27481086, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CI-flag.gif" },
  { id: "HR", value: 4227746, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/HR-flag.gif" },
  { id: "CU", value: 11059062, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CU-flag.gif" },
  { id: "CW", value: 151345, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CW-flag.gif" },
  { id: "CY", value: 1266676, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CY-flag.gif" },
  { id: "CZ", value: 10702498, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CZ-flag.gif" },
  { id: "DK", value: 5869410, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/DK-flag.gif" },
  { id: "DJ", value: 921804, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/DJ-flag.gif" },
  { id: "DM", value: 74243, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/DM-flag.gif" },
  { id: "DO", value: 10499707, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/DO-flag.gif" },
  { id: "EC", value: 16904867, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/EC-flag.gif" },
  { id: "EG", value: 104124440, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/EG-flag.gif" },
  { id: "SV", value: 6481102, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SV-flag.gif" },
  { id: "GQ", value: 836178, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GQ-flag.gif" },
  { id: "ER", value: 6081196, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ER-flag.gif" },
  { id: "EE", value: 1228624, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/EE-flag.gif" },
  { id: "SZ", value: 1104479, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SZ-flag.gif" },
  { id: "ET", value: 108113150, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ET-flag.gif" },
  { id: "FO", value: 51628, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/FO-flag.gif" },
  { id: "FJ", value: 935974, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/FJ-flag.gif" },
  { id: "FI", value: 5571665, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/FI-flag.gif" },
  { id: "FR", value: 67848156, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/FR-flag.gif" },
  { id: "PF", value: 295121, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PF-flag.gif" },
  { id: "GA", value: 2230908, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GA-flag.gif" },
  { id: "GM", value: 2173999, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GM-flag.gif" },
  { id: "GE", value: 3997000, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GE-flag.gif" },
  { id: "DE", value: 80159662, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/DE-flag.gif" },
  { id: "GH", value: 29340248, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GH-flag.gif" },
  { id: "GI", value: 29581, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GI-flag.gif" },
  { id: "GR", value: 10607051, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GR-flag.gif" },
  { id: "GL", value: 57616, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GL-flag.gif" },
  { id: "GD", value: 113094, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GD-flag.gif" },
  { id: "GU", value: 168485, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GU-flag.gif" },
  { id: "GT", value: 17153288, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GT-flag.gif" },
  { id: "GG", value: 67052, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GG-flag.gif" },
  { id: "GN", value: 12527440, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GN-flag.gif" },
  { id: "GW", value: 1927104, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GW-flag.gif" },
  { id: "GY", value: 750204, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GY-flag.gif" },
  { id: "HT", value: 11067777, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/HT-flag.gif" },
  { id: "HN", value: 9235340, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/HN-flag.gif" },
  { id: "HK", value: 7249907, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/HK-flag.gif" },
  { id: "HU", value: 9771827, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/HU-flag.gif" },
  { id: "IS", value: 350734, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IS-flag.gif" },
  { id: "IN", value: 1326093247, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IN-flag.gif" },
  { id: "ID", value: 267026366, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ID-flag.gif" },
  { id: "IR", value: 84923314, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IR-flag.gif" },
  { id: "IQ", value: 38872655, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IQ-flag.gif" },
  { id: "IE", value: 5176569, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IE-flag.gif" },
  { id: "IM", value: 90499, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IM-flag.gif" },
  { id: "IL", value: 8675475, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IL-flag.gif" },
  { id: "IT", value: 62402659, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/IT-flag.gif" },
  { id: "JM", value: 2808570, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/JM-flag.gif" },
  { id: "JP", value: 125507472, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/JP-flag.gif" },
  { id: "JE", value: 101073, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/JE-flag.gif" },
  { id: "JO", value: 10820644, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/JO-flag.gif" },
  { id: "KZ", value: 19091949, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KZ-flag.gif" },
  { id: "KE", value: 53527936, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KE-flag.gif" },
  { id: "KI", value: 111796, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KI-flag.gif" },
  { id: "KP", value: 25643466, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KP-flag.gif" },
  { id: "KR", value: 51835110, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KR-flag.gif" },
  { id: "XK", value: 1932774, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/XK-flag.gif" },
  { id: "KW", value: 2993706, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KW-flag.gif" },
  { id: "KG", value: 5964897, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KG-flag.gif" },
  { id: "LA", value: 7447396, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LA-flag.gif" },
  { id: "LV", value: 1881232, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LV-flag.gif" },
  { id: "LB", value: 5469612, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LB-flag.gif" },
  { id: "LS", value: 1969334, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LS-flag.gif" },
  { id: "LR", value: 5073296, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LR-flag.gif" },
  { id: "LY", value: 6890535, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LY-flag.gif" },
  { id: "LI", value: 39137, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LI-flag.gif" },
  { id: "LT", value: 2731464, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LT-flag.gif" },
  { id: "LU", value: 628381, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LU-flag.gif" },
  { id: "MO", value: 614458, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MO-flag.gif" },
  { id: "MG", value: 26955737, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MG-flag.gif" },
  { id: "MW", value: 21196629, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MW-flag.gif" },
  { id: "MY", value: 32652083, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MY-flag.gif" },
  { id: "MV", value: 391904, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MV-flag.gif" },
  { id: "ML", value: 19553397, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ML-flag.gif" },
  { id: "MT", value: 457267, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MT-flag.gif" },
  { id: "MH", value: 77917, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MH-flag.gif" },
  { id: "MR", value: 4005475, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MR-flag.gif" },
  { id: "MU", value: 1379365, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MU-flag.gif" },
  { id: "MX", value: 128649565, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MX-flag.gif" },
  { id: "FM", value: 102436, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/FM-flag.gif" },
  { id: "MD", value: 3364496, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MD-flag.gif" },
  { id: "MC", value: 39000, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MC-flag.gif" },
  { id: "MN", value: 3168026, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MN-flag.gif" },
  { id: "ME", value: 609859, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ME-flag.gif" },
  { id: "MS", value: 5373, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MS-flag.gif" },
  { id: "MA", value: 35561654, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MA-flag.gif" },
  { id: "MZ", value: 30098197, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MZ-flag.gif" },
  { id: "NA", value: 2630073, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NA-flag.gif" },
  { id: "NR", value: 11000, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NR-flag.gif" },
  { id: "NP", value: 30327877, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NP-flag.gif" },
  { id: "NL", value: 17280397, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NL-flag.gif" },
  { id: "NC", value: 290009, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NC-flag.gif" },
  { id: "NZ", value: 4925477, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NZ-flag.gif" },
  { id: "NI", value: 6203441, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NI-flag.gif" },
  { id: "NE", value: 22772361, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NE-flag.gif" },
  { id: "NG", value: 214028302, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NG-flag.gif" },
  { id: "MK", value: 2125971, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MK-flag.gif" },
  { id: "MP", value: 51433, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MP-flag.gif" },
  { id: "NO", value: 5467439, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/NO-flag.gif" },
  { id: "OM", value: 4664844, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/OM-flag.gif" },
  { id: "PK", value: 233500636, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PK-flag.gif" },
  { id: "PW", value: 21685, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PW-flag.gif" },
  { id: "PA", value: 3894082, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PA-flag.gif" },
  { id: "PG", value: 7259456, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PG-flag.gif" },
  { id: "PY", value: 7191685, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PY-flag.gif" },
  { id: "PE", value: 31914989, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PE-flag.gif" },
  { id: "PH", value: 109180815, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PH-flag.gif" },
  { id: "PL", value: 38282325, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PL-flag.gif" },
  { id: "PT", value: 10302674, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PT-flag.gif" },
  { id: "PR", value: 3189068, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PR-flag.gif" },
  { id: "QA", value: 2444174, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/QA-flag.gif" },
  { id: "RO", value: 21302893, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/RO-flag.gif" },
  { id: "RU", value: 141722205, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/RU-flag.gif" },
  { id: "RW", value: 12712431, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/RW-flag.gif" },
  { id: "SH", value: 7862, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SH-flag.gif" },
  { id: "KN", value: 53821, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/KN-flag.gif" },
  { id: "LC", value: 166487, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LC-flag.gif" },
  { id: "MF", value: 32556, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/MF-flag.gif" },
  { id: "PM", value: 5347, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PM-flag.gif" },
  { id: "VC", value: 101390, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/VC-flag.gif" },
  { id: "WS", value: 203774, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/WS-flag.gif" },
  { id: "SM", value: 34232, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SM-flag.gif" },
  { id: "ST", value: 211122, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ST-flag.gif" },
  { id: "SA", value: 34173498, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SA-flag.gif" },
  { id: "SN", value: 15736368, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SN-flag.gif" },
  { id: "RS", value: 7012165, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/RS-flag.gif" },
  { id: "SC", value: 95981, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SC-flag.gif" },
  { id: "SL", value: 6624933, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SL-flag.gif" },
  { id: "SG", value: 6209660, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SG-flag.gif" },
  { id: "SX", value: 43847, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SX-flag.gif" },
  { id: "SK", value: 5440602, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SK-flag.gif" },
  { id: "SI", value: 2102678, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SI-flag.gif" },
  { id: "SB", value: 685097, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SB-flag.gif" },
  { id: "SO", value: 11757124, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SO-flag.gif" },
  { id: "ZA", value: 56463617, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ZA-flag.gif" },
  { id: "SS", value: 10561244, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SS-flag.gif" },
  { id: "ES", value: 50015792, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ES-flag.gif" },
  { id: "LK", value: 22889201, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/LK-flag.gif" },
  { id: "SD", value: 45561556, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SD-flag.gif" },
  { id: "SR", value: 609569, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SR-flag.gif" },
  { id: "SE", value: 10202491, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SE-flag.gif" },
  { id: "CH", value: 8403994, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/CH-flag.gif" },
  { id: "SY", value: 19398448, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/SY-flag.gif" },
  { id: "TW", value: 23603049, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TW-flag.gif" },
  { id: "TJ", value: 8873669, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TJ-flag.gif" },
  { id: "TZ", value: 58552845, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TZ-flag.gif" },
  { id: "TH", value: 68977400, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TH-flag.gif" },
  { id: "TL", value: 1383723, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TL-flag.gif" },
  { id: "TG", value: 8608444, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TG-flag.gif" },
  { id: "TO", value: 106095, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TO-flag.gif" },
  { id: "TT", value: 1208789, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TT-flag.gif" },
  { id: "TN", value: 11721177, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TN-flag.gif" },
  { id: "TR", value: 82017514, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TR-flag.gif" },
  { id: "TM", value: 5528627, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TM-flag.gif" },
  { id: "TC", value: 55926, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TC-flag.gif" },
  { id: "TV", value: 11342, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/TV-flag.gif" },
  { id: "UG", value: 43252966, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/UG-flag.gif" },
  { id: "UA", value: 43922939, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/UA-flag.gif" },
  { id: "AE", value: 9992083, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/AE-flag.gif" },
  { id: "GB", value: 65761117, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GB-flag.gif" },
  { id: "US", value: 332639102, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/US-flag.gif" },
  { id: "UY", value: 3387605, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/UY-flag.gif" },
  { id: "UZ", value: 30565411, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/UZ-flag.gif" },
  { id: "VU", value: 298333, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/VU-flag.gif" },
  { id: "VE", value: 28644603, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/VE-flag.gif" },
  { id: "VN", value: 98721275, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/VN-flag.gif" },
  { id: "VI", value: 106235, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/VI-flag.gif" },
  { id: "WF", value: 15854, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/WF-flag.gif" },
  { id: "PS", value: 2900034, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/PS-flag.gif" },
  { id: "EH", value: 652271, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/EH-flag.gif" },
  { id: "YE", value: 29884405, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/YE-flag.gif" },
  { id: "ZM", value: 17426623, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ZM-flag.gif" },
  { id: "ZW", value: 14546314, "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/ZW-flag.gif" }

];

var maData = [
{ id: "AF", value: 19.5 },
{ id: "AL", value: 34.3 },
{ id: "DZ", value: 28.9 },
{ id: "AS", value: 27.2 },
{ id: "AD", value: 46.2 },
{ id: "AO", value: 15.9 },
{ id: "AI", value: 35.7 },
{ id: "AG", value: 32.7 },
{ id: "AR", value: 32.4 },
{ id: "AM", value: 36.6 },
{ id: "AW", value: 39.9 },
{ id: "AU", value: 37.5 },
{ id: "AT", value: 44.5 },
{ id: "AZ", value: 32.6 },
{ id: "BS", value: 32.8 },
{ id: "BH", value: 32.9 },
{ id: "BD", value: 27.9 },
{ id: "BB", value: 39.5 },
{ id: "BY", value: 40.9 },
{ id: "BE", value: 41.6 },
{ id: "BZ", value: 23.9 },
{ id: "BJ", value: 17 },
{ id: "BM", value: 43.6 },
{ id: "BT", value: 29.1 },
{ id: "BO", value: 25.3 },
{ id: "BA", value: 43.3 },
{ id: "BW", value: 25.7 },
{ id: "BR", value: 33.2 },
{ id: "VG", value: 37.2 },
{ id: "BN", value: 31.1 },
{ id: "BG", value: 43.7 },
{ id: "BF", value: 17.9 },
{ id: "MM", value: 29.2 },
{ id: "BI", value: 17.7 },
{ id: "CV", value: 26.8 },
{ id: "KH", value: 26.4 },
{ id: "CM", value: 18.5 },
{ id: "CA", value: 41.8 },
{ id: "KY", value: 40.5 },
{ id: "CF", value: 20 },
{ id: "TD", value: 16.1 },
{ id: "CL", value: 35.5 },
{ id: "CN", value: 38.4 },
{ id: "CO", value: 31.2 },
{ id: "KM", value: 20.9 },
{ id: "CD", value: 16.7 },
{ id: "CG", value: 19.5 },
{ id: "CK", value: 38.3 },
{ id: "CR", value: 32.6 },
{ id: "CI", value: 20.3 },
{ id: "HR", value: 43.9 },
{ id: "CU", value: 42.1 },
{ id: "CW", value: 36.7 },
{ id: "CY", value: 37.9 },
{ id: "CZ", value: 43.3 },
{ id: "DK", value: 42 },
{ id: "DJ", value: 24.9 },
{ id: "DM", value: 34.9 },
{ id: "DO", value: 27.9 },
{ id: "EC", value: 28.8 },
{ id: "EG", value: 24.1 },
{ id: "SV", value: 27.7 },
{ id: "GQ", value: 20.3 },
{ id: "ER", value: 20.3 },
{ id: "EE", value: 43.7 },
{ id: "SZ", value: 23.7 },
{ id: "ET", value: 19.8 },
{ id: "FO", value: 37.2 },
{ id: "FJ", value: 29.9 },
{ id: "FI", value: 42.8 },
{ id: "FR", value: 41.7 },
{ id: "PF", value: 33.3 },
{ id: "GA", value: 21 },
{ id: "GM", value: 21.8 },
{ id: "PS", value: 18 },
{ id: "GE", value: 38.6 },
{ id: "DE", value: 47.8 },
{ id: "GH", value: 21.4 },
{ id: "GI", value: 35.5 },
{ id: "GR", value: 45.3 },
{ id: "GL", value: 34.3 },
{ id: "GD", value: 33.3 },
{ id: "GU", value: 29.4 },
{ id: "GT", value: 23.2 },
{ id: "GG", value: 44.3 },
{ id: "GN", value: 19.1 },
{ id: "GW", value: 18 },
{ id: "GY", value: 27.5 },
{ id: "HT", value: 24.1 },
{ id: "HN", value: 24.4 },
{ id: "HK", value: 45.6 },
{ id: "HU", value: 43.6 },
{ id: "IS", value: 37.1 },
{ id: "IN", value: 28.7 },
{ id: "ID", value: 31.1 },
{ id: "IR", value: 31.7 },
{ id: "IQ", value: 21.2 },
{ id: "IE", value: 37.8 },
{ id: "IM", value: 44.6 },
{ id: "IL", value: 30.4 },
{ id: "IT", value: 46.5 },
{ id: "JM", value: 29.4 },
{ id: "JP", value: 48.6 },
{ id: "JE", value: 37.5 },
{ id: "JO", value: 23.5 },
{ id: "KZ", value: 31.6 },
{ id: "KE", value: 20 },
{ id: "KI", value: 25.7 },
{ id: "KP", value: 34.6 },
{ id: "KR", value: 43.2 },
{ id: "XK", value: 30.5 },
{ id: "KW", value: 29.7 },
{ id: "KG", value: 27.3 },
{ id: "LA", value: 24 },
{ id: "LV", value: 44.4 },
{ id: "LB", value: 33.7 },
{ id: "LS", value: 24.7 },
{ id: "LR", value: 18 },
{ id: "LY", value: 25.8 },
{ id: "LI", value: 43.7 },
{ id: "LT", value: 44.5 },
{ id: "LU", value: 39.5 },
{ id: "MO", value: 40.8 },
{ id: "MG", value: 20.3 },
{ id: "MW", value: 16.8 },
{ id: "MY", value: 29.2 },
{ id: "MV", value: 29.5 },
{ id: "ML", value: 16 },
{ id: "MT", value: 42.3 },
{ id: "MH", value: 23.8 },
{ id: "MR", value: 21 },
{ id: "MU", value: 36.3 },
{ id: "MX", value: 29.3 },
{ id: "FM", value: 26.3 },
{ id: "MD", value: 37.7 },
{ id: "MC", value: 55.4 },
{ id: "MN", value: 29.8 },
{ id: "ME", value: 39.6 },
{ id: "MS", value: 34.8 },
{ id: "MA", value: 29.1 },
{ id: "MZ", value: 17 },
{ id: "NA", value: 21.8 },
{ id: "NR", value: 27 },
{ id: "NP", value: 25.3 },
{ id: "NL", value: 42.8 },
{ id: "NC", value: 32.9 },
{ id: "NZ", value: 37.2 },
{ id: "NI", value: 27.3 },
{ id: "NE", value: 14.8 },
{ id: "NG", value: 18.6 },
{ id: "MK", value: 39 },
{ id: "MP", value: 32.8 },
{ id: "NO", value: 39.5 },
{ id: "OM", value: 26.2 },
{ id: "PK", value: 22 },
{ id: "PW", value: 33.9 },
{ id: "PA", value: 30.1 },
{ id: "PG", value: 24 },
{ id: "PY", value: 29.7 },
{ id: "PE", value: 29.1 },
{ id: "PH", value: 24.1 },
{ id: "PL", value: 41.9 },
{ id: "PT", value: 44.6 },
{ id: "PR", value: 43.6 },
{ id: "QA", value: 33.7 },
{ id: "RO", value: 42.5 },
{ id: "RU", value: 40.3 },
{ id: "RW", value: 19.7 },
{ id: "BL", value: 45.6 },
{ id: "SH", value: 43.2 },
{ id: "KN", value: 36.5 },
{ id: "LC", value: 36.9 },
{ id: "MF", value: 33.3 },
{ id: "PM", value: 48.5 },
{ id: "VC", value: 35.3 },
{ id: "WS", value: 25.6 },
{ id: "SM", value: 45.2 },
{ id: "ST", value: 19.3 },
{ id: "SA", value: 30.8 },
{ id: "SN", value: 19.4 },
{ id: "RS", value: 43.4 },
{ id: "SC", value: 36.8 },
{ id: "SL", value: 19.1 },
{ id: "SG", value: 35.6 },
{ id: "SX", value: 41.1 },
{ id: "SK", value: 41.8 },
{ id: "SI", value: 44.9 },
{ id: "SB", value: 23.5 },
{ id: "SO", value: 18.5 },
{ id: "ZA", value: 28 },
{ id: "SS", value: 18.6 },
{ id: "ES", value: 43.9 },
{ id: "LK", value: 33.7 },
{ id: "SD", value: 18.3 },
{ id: "SR", value: 31 },
{ id: "SE", value: 41.1 },
{ id: "CH", value: 42.7 },
{ id: "SY", value: 23.5 },
{ id: "TW", value: 42.3 },
{ id: "TJ", value: 25.3 },
{ id: "TZ", value: 18.2 },
{ id: "TH", value: 39 },
{ id: "TL", value: 19.6 },
{ id: "TG", value: 20 },
{ id: "TO", value: 24.1 },
{ id: "TT", value: 37.8 },
{ id: "TN", value: 32.7 },
{ id: "TR", value: 32.2 },
{ id: "TM", value: 29.2 },
{ id: "TC", value: 34.6 },
{ id: "TV", value: 26.6 },
{ id: "UG", value: 15.7 },
{ id: "UA", value: 41.2 },
{ id: "AE", value: 38.4 },
{ id: "GB", value: 40.6 },
{ id: "US", value: 38.5 },
{ id: "UY", value: 35.5 },
{ id: "UZ", value: 30.1 },
{ id: "VU", value: 23 },
{ id: "VE", value: 30 },
{ id: "VN", value: 31.9 },
{ id: "VI", value: 41.8 },
{ id: "WF", value: 34 },
{ id: "PS", value: 21.9 },
{ id: "EH", value: 21.8 },
{ id: "YE", value: 19.8 },
{ id: "ZM", value: 16.9 },
{ id: "ZW", value: 20.5 }

];

var gdpData = [
{ id: "AF", value: 69450000000 },
{ id: "AL", value: 36010000000 },
{ id: "DZ", value: 630000000000 },
{ id: "AS", value: 658000000 },
{ id: "AD", value: 3327000000 },
{ id: "AO", value: 193600000000 },
{ id: "AI", value: 175400000 },
{ id: "AG", value: 2398000000 },
{ id: "AR", value: 922100000000 },
{ id: "AM", value: 28340000000 },
{ id: "AW", value: 4158000000 },
{ id: "AU", value: 1248000000000 },
{ id: "AT", value: 441000000000 },
{ id: "AZ", value: 172200000000 },
{ id: "BS", value: 12060000000 },
{ id: "BH", value: 71170000000 },
{ id: "BD", value: 690300000000 },
{ id: "BB", value: 5218000000 },
{ id: "BY", value: 179400000000 },
{ id: "BE", value: 529200000000 },
{ id: "BZ", value: 3218000000 },
{ id: "BJ", value: 25390000000 },
{ id: "BM", value: 6127000000 },
{ id: "BT", value: 7205000000 },
{ id: "BO", value: 83720000000 },
{ id: "BA", value: 44830000000 },
{ id: "BW", value: 39010000000 },
{ id: "BR", value: 3248000000000 },
{ id: "VG", value: 500000000 },
{ id: "BN", value: 33870000000 },
{ id: "BG", value: 153500000000 },
{ id: "BF", value: 35850000000 },
{ id: "MM", value: 329800000000 },
{ id: "BI", value: 8007000000 },
{ id: "CV", value: 3777000000 },
{ id: "KH", value: 64210000000 },
{ id: "CM", value: 89540000000 },
{ id: "CA", value: 1774000000000 },
{ id: "KY", value: 2507000000 },
{ id: "CF", value: 3390000000 },
{ id: "TD", value: 28620000000 },
{ id: "CL", value: 452100000000 },
{ id: "CN", value: 25360000000000 },
{ id: "CO", value: 711600000000 },
{ id: "KM", value: 1319000000 },
{ id: "CD", value: 68600000000 },
{ id: "CG", value: 29390000000 },
{ id: "CK", value: 299900000 },
{ id: "CR", value: 83940000000 },
{ id: "CI", value: 97160000000 },
{ id: "HR", value: 102100000000 },
{ id: "CU", value: 137000000000 },
{ id: "CW", value: 3128000000 },
{ id: "CY", value: 31780000000 },
{ id: "CZ", value: 375900000000 },
{ id: "DK", value: 287800000000 },
{ id: "DJ", value: 3640000000 },
{ id: "DM", value: 783000000 },
{ id: "DO", value: 173000000000 },
{ id: "EC", value: 193000000000 },
{ id: "EG", value: 1204000000000 },
{ id: "SV", value: 51170000000 },
{ id: "GQ", value: 31520000000 },
{ id: "ER", value: 9402000000 },
{ id: "EE", value: 41650000000 },
{ id: "SZ", value: 11600000000 },
{ id: "ET", value: 200600000000 },
{ id: "FO", value: 2001000000 },
{ id: "FJ", value: 8629000000 },
{ id: "FI", value: 244900000000 },
{ id: "FR", value: 2856000000000 },
{ id: "PF", value: 5490000000 },
{ id: "GA", value: 36660000000 },
{ id: "GM", value: 5556000000 },
{ id: "GE", value: 39850000000 },
{ id: "DE", value: 4199000000000 },
{ id: "GH", value: 134000000000 },
{ id: "GI", value: 2044000000 },
{ id: "GR", value: 299300000000 },
{ id: "GL", value: 2413000000 },
{ id: "GD", value: 1634000000 },
{ id: "GU", value: 5793000000 },
{ id: "GT", value: 138100000000 },
{ id: "GG", value: 3465000000 },
{ id: "GN", value: 27970000000 },
{ id: "GW", value: 3171000000 },
{ id: "GY", value: 6301000000 },
{ id: "HT", value: 19970000000 },
{ id: "HN", value: 46300000000 },
{ id: "HK", value: 480500000000 },
{ id: "HU", value: 289600000000 },
{ id: "IS", value: 18180000000 },
{ id: "IN", value: 9474000000000 },
{ id: "ID", value: 3250000000000 },
{ id: "IR", value: 1640000000000 },
{ id: "IQ", value: 649300000000 },
{ id: "IE", value: 353300000000 },
{ id: "IM", value: 6792000000 },
{ id: "IL", value: 317100000000 },
{ id: "IT", value: 2317000000000 },
{ id: "JM", value: 26060000000 },
{ id: "JP", value: 5443000000000 },
{ id: "JE", value: 5569000000 },
{ id: "JO", value: 89000000000 },
{ id: "KZ", value: 478600000000 },
{ id: "KE", value: 163700000000 },
{ id: "KI", value: 227000000 },
{ id: "KP", value: 40000000000 },
{ id: "KR", value: 2035000000000 },
{ id: "XK", value: 19600000000 },
{ id: "KW", value: 289700000000 },
{ id: "KG", value: 23150000000 },
{ id: "LA", value: 49340000000 },
{ id: "LV", value: 54020000000 },
{ id: "LB", value: 88250000000 },
{ id: "LS", value: 6656000000 },
{ id: "LR", value: 6112000000 },
{ id: "LY", value: 61970000000 },
{ id: "LI", value: 4978000000 },
{ id: "LT", value: 91470000000 },
{ id: "LU", value: 62110000000 },
{ id: "MO", value: 77330000000 },
{ id: "MG", value: 39850000000 },
{ id: "MW", value: 22420000000 },
{ id: "MY", value: 933300000000 },
{ id: "MV", value: 6901000000 },
{ id: "ML", value: 41220000000 },
{ id: "MT", value: 19260000000 },
{ id: "MH", value: 196000000 },
{ id: "MR", value: 17280000000 },
{ id: "MU", value: 28270000000 },
{ id: "MX", value: 2463000000000 },
{ id: "FM", value: 348000000 },
{ id: "MD", value: 23720000000 },
{ id: "MC", value: 7672000000 },
{ id: "MN", value: 43540000000 },
{ id: "ME", value: 11080000000 },
{ id: "MS", value: 167400000 },
{ id: "MA", value: 298600000000 },
{ id: "MZ", value: 37090000000 },
{ id: "NA", value: 26600000000 },
{ id: "NR", value: 160000000 },
{ id: "NP", value: 79190000000 },
{ id: "NL", value: 924400000000 },
{ id: "NC", value: 11110000000 },
{ id: "NZ", value: 189000000000 },
{ id: "NI", value: 36400000000 },
{ id: "NE", value: 21860000000 },
{ id: "NG", value: 1121000000000 },
{ id: "MK", value: 31030000000 },
{ id: "MP", value: 1242000000 },
{ id: "NO", value: 381200000000 },
{ id: "OM", value: 190100000000 },
{ id: "PK", value: 1061000000000 },
{ id: "PW", value: 264000000 },
{ id: "PA", value: 104100000000 },
{ id: "PG", value: 30190000000 },
{ id: "PY", value: 88910000000 },
{ id: "PE", value: 430300000000 },
{ id: "PH", value: 877200000000 },
{ id: "PL", value: 1126000000000 },
{ id: "PT", value: 314100000000 },
{ id: "PR", value: 130000000000 },
{ id: "QA", value: 339500000000 },
{ id: "RO", value: 483400000000 },
{ id: "RU", value: 4016000000000 },
{ id: "RW", value: 24680000000 },
{ id: "SH", value: 31100000 },
{ id: "KN", value: 1550000000 },
{ id: "LC", value: 2542000000 },
{ id: "MF", value: 561500000 },
{ id: "PM", value: 261300000 },
{ id: "VC", value: 1265000000 },
{ id: "WS", value: 1137000000 },
{ id: "SM", value: 2064000000 },
{ id: "ST", value: 686000000 },
{ id: "SA", value: 1775000000000 },
{ id: "SN", value: 54800000000 },
{ id: "RS", value: 105700000000 },
{ id: "SC", value: 2750000000 },
{ id: "SL", value: 11550000000 },
{ id: "SG", value: 528100000000 },
{ id: "SX", value: 365800000 },
{ id: "SK", value: 179700000000 },
{ id: "SI", value: 71230000000 },
{ id: "SB", value: 1330000000 },
{ id: "SO", value: 20440000000 },
{ id: "ZA", value: 767200000000 },
{ id: "SS", value: 20010000000 },
{ id: "ES", value: 1778000000000 },
{ id: "LK", value: 275800000000 },
{ id: "SD", value: 177400000000 },
{ id: "SR", value: 8688000000 },
{ id: "SE", value: 518000000000 },
{ id: "CH", value: 523100000000 },
{ id: "SY", value: 50280000000 },
{ id: "TW", value: 1189000000000 },
{ id: "TJ", value: 28430000000 },
{ id: "TZ", value: 162500000000 },
{ id: "TH", value: 1236000000000 },
{ id: "TL", value: 7426000000 },
{ id: "TG", value: 12970000000 },
{ id: "TO", value: 591000000 },
{ id: "TT", value: 42850000000 },
{ id: "TN", value: 137700000000 },
{ id: "TR", value: 2186000000000 },
{ id: "TM", value: 103700000000 },
{ id: "TC", value: 632000000 },
{ id: "TV", value: 42000000 },
{ id: "UG", value: 89190000000 },
{ id: "UA", value: 369600000000 },
{ id: "AE", value: 696000000000 },
{ id: "GB", value: 2925000000000 },
{ id: "US", value: 19490000000000 },
{ id: "UY", value: 78160000000 },
{ id: "UZ", value: 223000000000 },
{ id: "VU", value: 772000000 },
{ id: "VE", value: 381600000000 },
{ id: "VN", value: 648700000000 },
{ id: "VI", value: 3872000000 },
{ id: "WF", value: 60000000 },
{ id: "PS", value: 21220000000 },
{ id: "EH", value: 906500000 },
{ id: "YE", value: 73630000000 },
{ id: "ZM", value: 68930000000 },
{ id: "ZW", value: 34270000000 }

];

// country data
polygonSeries.data = popData;
// excludes Antarctica
polygonSeries.exclude = ["AQ"];

var imageSeries = chart.series.push(new am4maps.MapImageSeries());

var imageSeriesTemplate = imageSeries.mapImages.template;
var marker = imageSeriesTemplate.createChild(am4core.Image);
marker.width = 28;
marker.height = 28;
marker.nonScaling = true;
marker.tooltipText = "{title}";
marker.horizontalCenter = "middle";
marker.verticalCenter = "middle";
marker.propertyFields.href = "flag";

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";

imageSeries.data = [{"latitude": 48.8, "longitude": 2.3, "title": "paris", "flag": "https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/FR-flag.gif"}]

let hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

let linkContainer = chart.createChild(am4core.Container);
linkContainer.isMeasured = false;
linkContainer.layout = "vertical";
linkContainer.x = am4core.percent(95);
linkContainer.y = am4core.percent(60);
linkContainer.horizontalCenter = "middle";

let popButton= linkContainer.createChild(am4core.TextLink);
popButton.margin(10,10,10,10);
popButton.text = "Population";
popButton.events.on("hit", function(){
    //chart.projection = new am4maps.projections.Projection();
    title.text = "Population"
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#ffffff"),
      max: am4core.color("#AAAA00")
    });
    polygonSeries.data = popData;
})

let maButton = linkContainer.createChild(am4core.TextLink);
maButton.text = "Median Age";
maButton.margin(10,10,10,10);
maButton.events.on("hit", function(){
    //chart.projection = new am4maps.projections.maButton();
    title.text = "Median Age"
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#ffffff"),
      max: am4core.color("#8573ff")
    });
    polygonSeries.data = maData;
})

let gdpButton = linkContainer.createChild(am4core.TextLink);
gdpButton.text = "GDP (PPP)";
gdpButton.margin(10,10,10,10);
gdpButton.events.on("hit", function(){
    //chart.projection = new am4maps.projections.gdpButton();
    title.text = "GDP (PPP)"
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#ffffff"),
      max: am4core.color("#60e645")
    });
    polygonSeries.data = gdpData;
})

var tHex = "#3633d6";
var rc1 = 0;
var rc2 = 0;
var rc3 = 0;
var rc4 = 0;
var correct = null;
let testButton = linkContainer.createChild(am4core.TextLink);
testButton.text = "Test (prototype)";
testButton.margin(10,10,10,10);
testButton.events.on("hit", function(){
    //chart.projection = new am4maps.projections.gdpButton();

    rc1 = Math.floor(Math.random()*170);
    do {
      rc2 = Math.floor(Math.random()*170);
    } while(rc2 == rc1);
    do {
      rc3 = Math.floor(Math.random()*170);
    } while(rc3 == rc1 || rc3 == rc2);
    do {
      rc4 = Math.floor(Math.random()*170);
    } while(rc4 == rc1 || rc4 == rc2 || rc4 == rc3);

    correct = popData[rc1];
    if(correct.value < popData[rc2].value)
      correct = popData[rc2];
    if(correct.value < popData[rc3].value)
      correct = popData[rc3];
    if(correct.value < popData[rc4].value)
      correct = popData[rc4];

    title.text = "Select the highlighted country with the highest population\n\n" + popData[rc1].name + " | " + popData[rc2].name + " | " + popData[rc3].name + " | " + popData[rc4].name;
    polygonSeries.data = [{
     "id": popData[rc1].id,
     "value": 1,
     "fill": am4core.color(tHex)
   }, {
     "id": popData[rc2].id,
     "value": 1,
     "fill": am4core.color(tHex)
     }, {
     "id": popData[rc3].id,
     "value": 1,
     "fill": am4core.color(tHex)
     }, {
     "id": popData[rc4].id,
     "value": 1,
     "fill": am4core.color(tHex)
   }];
   polygonTemplate.propertyFields.fill = "fill";
   polygonTemplate.events.on("hit", function(ev) {
     if(ev.target.dataItem.dataContext.id == correct.id) {
       title.text = "Correct!"
       polygonSeries.data = [{ "id": correct.id, "fill": am4core.color("#60e645")}];
     }
     else
      title.text = "Wrong"
   })
})

let lc2 = chart.createChild(am4core.Container);
lc2.isMeasured = false;
lc2.layout = "horizontal";
lc2.x = am4core.percent(50);
lc2.y = am4core.percent(88);
lc2.horizontalCenter = "middle";

let millerButton= lc2.createChild(am4core.TextLink);
millerButton.margin(10,10,10,10);
millerButton.text = "Miller";
millerButton.events.on("hit", function(){
    chart.projection = millerProj;
    chart.panBehavior = "move";
})

let orthoButton= lc2.createChild(am4core.TextLink);
orthoButton.margin(10,10,10,10);
orthoButton.text = "Orthographic";
orthoButton.events.on("hit", function(){
    chart.projection = orthoProj;
    chart.panBehavior = "rotateLongLat";
})

});

}

ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
