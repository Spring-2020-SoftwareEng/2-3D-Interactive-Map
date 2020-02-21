import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";

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

      // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);

  var mapData = [
    { "id": "AF", "name": "Afghanistan", "value": 32358260, "color": chart.colors.getIndex(0) },
    { "id": "DZ", "name": "Algeria", "value": 35980193, "color": chart.colors.getIndex(2) },
    { "id": "AO", "name": "Angola", "value": 19618432, "color": chart.colors.getIndex(2) },
    { "id": "AR", "name": "Argentina", "value": 40764561, "color": chart.colors.getIndex(3) },
    { "id": "AM", "name": "Armenia", "value": 3100236, "color": chart.colors.getIndex(1) },
    { "id": "AU", "name": "Australia", "value": 22605732, "color": "#8aabb0" },
    { "id": "BH", "name": "Bahrain", "value": 1323535, "color": chart.colors.getIndex(0) },
    { "id": "BD", "name": "Bangladesh", "value": 150493658, "color": chart.colors.getIndex(0) },
    { "id": "BY", "name": "Belarus", "value": 9559441, "color": chart.colors.getIndex(1) },
    { "id": "BE", "name": "Belgium", "value": 10754056, "color": chart.colors.getIndex(1) },
    { "id": "BJ", "name": "Benin", "value": 9099922, "color": chart.colors.getIndex(2) },
    { "id": "BO", "name": "Bolivia", "value": 10088108, "color": chart.colors.getIndex(3) },
    { "id": "BW", "name": "Botswana", "value": 2030738, "color": chart.colors.getIndex(2) },
    { "id": "BR", "name": "Brazil", "value": 196655014, "color": chart.colors.getIndex(3) },
    { "id": "BN", "name": "Brunei", "value": 405938, "color": chart.colors.getIndex(0) },
    { "id": "KH", "name": "Cambodia", "value": 14305183, "color": chart.colors.getIndex(0) },
    { "id": "CM", "name": "Cameroon", "value": 20030362, "color": chart.colors.getIndex(2) },
    { "id": "CA", "name": "Canada", "value": 34349561, "color": chart.colors.getIndex(4) }
  ];


  // Set map definition
  chart.geodata = am4geodata_worldLow;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.exclude = ["AQ"];
  polygonSeries.useGeodata = true;
  polygonSeries.nonScalingStroke = true;
  polygonSeries.strokeWidth = 0.5;
  polygonSeries.calculateVisualCenter = true;

  polygonSeries.events.on("validated", function(){
    imageSeries.invalidate();
  })


  var imageSeries = chart.series.push(new am4maps.MapImageSeries());
  imageSeries.data = mapData;
  imageSeries.dataFields.value = "value";

  var imageTemplate = imageSeries.mapImages.template;
  imageTemplate.nonScaling = true

  imageTemplate.adapter.add("latitude", function(latitude, target) {
    var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
    if(polygon){
      return polygon.visualLatitude;
     }
     return latitude;
  })

  imageTemplate.adapter.add("longitude", function(longitude, target) {
    var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
    if(polygon){
      return polygon.visualLongitude;
     }
     return longitude;
  })

  var circle = imageTemplate.createChild(am4core.Circle);
  circle.fillOpacity = 0.7;
  circle.propertyFields.fill = "color";
  circle.tooltipText = "{name}: [bold]{value}[/]";

  imageSeries.heatRules.push({
    "target": circle,
    "property": "radius",
    "min": 4,
    "max": 30,
    "dataField": "value"
  })

  let heatLegend = chart.createChild(am4maps.HeatLegend);
heatLegend.series = polygonSeries;
heatLegend.align = "right";
heatLegend.valign = "bottom";
heatLegend.width = am4core.percent(20);
heatLegend.marginRight = am4core.percent(4);
heatLegend.minValue = 0;
heatLegend.maxValue = 40000000;

// Set up custom heat map legend labels using axis ranges
let minRange = heatLegend.valueAxis.axisRanges.create();
minRange.value = heatLegend.minValue;
minRange.label.text = "Little";
let maxRange = heatLegend.valueAxis.axisRanges.create();
maxRange.value = heatLegend.maxValue;
maxRange.label.text = "A lot!";

// Blank out internal heat legend value axis labels
heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
  return "";
});

// Configure series tooltip
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}: {value}";
polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeWidth = 0.5;

// Create hover state and set alternative fill color
let hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#3c5bdc");

  var label = imageTemplate.createChild(am4core.Label);
  label.text = "{name}"
  label.horizontalCenter = "middle";
  label.padding(0,0,0,0);
  label.adapter.add("dy", function(dy, target){
    var circle = target.parent.children.getIndex(0);
    return circle.pixelRadius;
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
