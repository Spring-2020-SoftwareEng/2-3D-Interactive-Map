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

chart.geodata = am4geodata_worldLow;
chart.projection = new am4maps.projections.Orthographic();
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

var popData = [
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

// country data
polygonSeries.data = popData;
// excludes Antarctica
polygonSeries.exclude = ["AQ"];

let hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

let linkContainer = chart.createChild(am4core.Container);
linkContainer.isMeasured = false;
linkContainer.layout = "vertical";
linkContainer.x = am4core.percent(95);
linkContainer.y = am4core.percent(60);
linkContainer.horizontalCenter = "middle";

let equirectangular= linkContainer.createChild(am4core.TextLink);
equirectangular.margin(10,10,10,10);
equirectangular.text = "Population";
equirectangular.events.on("hit", function(){
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

let mercator = linkContainer.createChild(am4core.TextLink);
mercator.text = "Median Age";
mercator.margin(10,10,10,10);
mercator.events.on("hit", function(){
    //chart.projection = new am4maps.projections.Mercator();
    title.text = "Median Age"
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#ffffff"),
      max: am4core.color("#8573ff")
    });
    polygonSeries.data = maData;
})

<<<<<<< Updated upstream
=======
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
var randC = ["AF", "FR", "US", "CH", "YE"];
var rc1 = 0;
var rc2 = 0;
var rc3 = 0;
var rc4 = 0;
var correct = null;
let testButton = linkContainer.createChild(am4core.TextLink);
testButton.text = "Test";
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

    title.text = "" + popData[rc1].name + " | " + popData[rc2].name + " | " + popData[rc3].name + " | " + popData[rc4].name;
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
       ev.target.dataItem.dataContext.fill = am4core.color("#60e645");
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
    chart.projection = new am4maps.projections.Miller();
    chart.panBehavior = "move";
})

let orthoButton= lc2.createChild(am4core.TextLink);
orthoButton.margin(10,10,10,10);
orthoButton.text = "Orthographic";
orthoButton.events.on("hit", function(){
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
})

>>>>>>> Stashed changes
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
