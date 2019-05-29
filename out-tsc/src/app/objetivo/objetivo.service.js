import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ObjetivoService = /** @class */ (function () {
    function ObjetivoService(http) {
        this.http = http;
        this.objetivoRoot = 'http://localhost:8000/';
    }
    ObjetivoService.prototype.getObjetivos = function () {
        return this.http.get(this.objetivoRoot.concat('objetivo/'));
    };
    ObjetivoService.prototype.showOneObjetivo = function (id) {
        return this.http.get(this.objetivoRoot.concat("objetivo/" + id + "/"));
    };
    ObjetivoService.prototype.createObjetivo = function (title, description) {
        return this.http.post(this.objetivoRoot.concat('objetivo/'), { title: title, description: description });
    };
    ObjetivoService.prototype.updateObjetivo = function (id, title, description) {
        return this.http.put(this.objetivoRoot.concat("objetivo/" + id + "/"), { title: title, description: description });
    };
    ObjetivoService.prototype.deleteObjetivo = function (id) {
        return this.http.delete(this.objetivoRoot.concat("objetivo/" + id + "/"));
    };
    ObjetivoService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ObjetivoService);
    return ObjetivoService;
}());
export { ObjetivoService };
//# sourceMappingURL=objetivo.service.js.map