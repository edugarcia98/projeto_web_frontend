import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CursoService = /** @class */ (function () {
    function CursoService(http) {
        this.http = http;
        this.cursoRoot = 'http://localhost:8000/';
    }
    CursoService.prototype.getCursos = function () {
        return this.http.get(this.cursoRoot.concat('curso/'));
    };
    CursoService.prototype.showOneCurso = function (id) {
        return this.http.get(this.cursoRoot.concat("curso/" + id + "/"));
    };
    CursoService.prototype.createCurso = function (title, description) {
        return this.http.post(this.cursoRoot.concat('curso/'), { title: title, description: description });
    };
    CursoService.prototype.updateCurso = function (id, title, description) {
        return this.http.put(this.cursoRoot.concat("curso/" + id + "/"), { title: title, description: description });
    };
    CursoService.prototype.deleteCurso = function (id) {
        return this.http.delete(this.cursoRoot.concat("curso/" + id + "/"));
    };
    CursoService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CursoService);
    return CursoService;
}());
export { CursoService };
//# sourceMappingURL=curso.service.js.map