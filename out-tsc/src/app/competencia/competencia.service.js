import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CompetenciaService = /** @class */ (function () {
    function CompetenciaService(http) {
        this.http = http;
        this.competenciaRoot = 'http://localhost:8000/';
    }
    CompetenciaService.prototype.getCompetencias = function () {
        return this.http.get(this.competenciaRoot.concat('competencia/'));
    };
    CompetenciaService.prototype.showOneCompetencia = function (id) {
        return this.http.get(this.competenciaRoot.concat("competencia/" + id + "/"));
    };
    CompetenciaService.prototype.createCompetencia = function (title, description) {
        return this.http.post(this.competenciaRoot.concat('competencia/'), { title: title, description: description });
    };
    CompetenciaService.prototype.updateCompetencia = function (id, title, description) {
        return this.http.put(this.competenciaRoot.concat("competencia/" + id + "/"), { title: title, description: description });
    };
    CompetenciaService.prototype.deleteCompetencia = function (id) {
        return this.http.delete(this.competenciaRoot.concat("competencia/" + id + "/"));
    };
    CompetenciaService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CompetenciaService);
    return CompetenciaService;
}());
export { CompetenciaService };
//# sourceMappingURL=competencia.service.js.map