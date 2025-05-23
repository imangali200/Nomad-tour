// Reference only
class Poi {
    constructor(latitude, longitude) {
      this.latitude = this.deg2rad(latitude);
      this.longitude = this.deg2rad(longitude);
    }
  
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  
    getLatitude() {
      return this.latitude;
    }
  
    getLongitude() {
      return this.longitude;
    }
  
    distanceTo(other) {
      const earthRadius = 6371000;
  
      const diffLatitude = other.getLatitude() - this.latitude;
      const diffLongitude = other.getLongitude() - this.longitude;
  
      const a = Math.sin(diffLatitude / 2) * Math.sin(diffLatitude / 2) +
                Math.cos(other.getLatitude()) * Math.cos(this.latitude) *
                Math.sin(diffLongitude / 2) * Math.sin(diffLongitude / 2);
      const c = 2 * Math.asin(Math.sqrt(a));
  
      return c * earthRadius;
    }
  }
  
  class PoiFactory {
    constructor(start = { latitude: 13.772478, longitude: 100.482653 }, end = { latitude: 13.736280, longitude: 100.536051 }, width = 1280, height = 800) {
      this.start = start;
      this.end = end;
      this.width = width;
      this.height = height;
      this.mapStartPoint();
    }
  
    calc(source, target) {
      const _a = new Poi(source.latitude, target.longitude);
      const a = new Poi(target.latitude, target.longitude);
  
      const y = _a.distanceTo(a);
  
      const _b = new Poi(source.latitude, source.longitude);
      const b = new Poi(source.latitude, target.longitude);
  
      const x = _b.distanceTo(b);
  
      return { x, y };
    }
  
    mapStartPoint() {
      const calc = this.calc(this.start, this.end);
  
      this.startPoint = {
        x: calc.x / this.width,
        y: calc.y / this.height
      };
    }
  
    calculate(target) {
      const calc = this.calc(this.start, target);
  
      return {
        x: Math.floor(calc.x / this.startPoint.x),
        y: Math.floor(calc.y / this.startPoint.y)
      };
    }
  }
  
  module.exports = { Poi, PoiFactory };
  