import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CursoObjetivoService = /** @class */ (function () {
    function CursoObjetivoService(http) {
        this.http = http;
        this.cursoObjetivoRoot = 'http://localhost:8000/';
    }
    CursoObjetivoService.prototype.getCursosObjetivo = function () {
        return this.http.get(this.cursoObjetivoRoot.concat('curso-objetivo/'));
    };
    CursoObjetivoService.prototype.createCursoObjetivo = function (curso, objetivo) {
        console.log(curso);
        console.log(objetivo);
        return this.http.post(this.cursoObjetivoRoot.concat('curso-objetivo/'), { curso: curso, objetivo: objetivo });
    };
    CursoObjetivoService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CursoObjetivoService);
    return CursoObjetivoService;
}());
export { CursoObjetivoService };
//# sourceMappingURL=curso-objetivo.service.js.map