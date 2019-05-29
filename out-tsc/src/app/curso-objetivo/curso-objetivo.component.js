import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/curso/curso.service';
import { ObjetivoService } from 'src/app/objetivo/objetivo.service';
import { CursoObjetivoService } from './curso-objetivo.service';
var CursoObjetivoComponent = /** @class */ (function () {
    function CursoObjetivoComponent(route, api, api2, api3) {
        this.route = route;
        this.api = api;
        this.api2 = api2;
        this.api3 = api3;
    }
    CursoObjetivoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.cursoId = id;
        this.api3.getCursosObjetivo().subscribe(function (cos) {
            _this.cursosObjetivo = cos;
        });
        this.api.getCursos().subscribe(function (items) {
            items.forEach(function (c) {
                if (c.id == _this.cursoId) {
                    _this.curso = c;
                    _this.cursoTitle = c.title;
                    _this.cursoDescription = c.description;
                    _this.items = c.objetivos;
                }
            });
        });
    };
    CursoObjetivoComponent.prototype.add = function (itemTitle, itemDescription, id) {
        var _this = this;
        this.api2.getObjetivos().subscribe(function (items) { return _this.objetivos = items; });
        this.api2.createObjetivo(itemTitle, itemDescription).subscribe(function (item) {
            _this.objetivos.push(item);
            _this.api3.createCursoObjetivo(_this.curso, item).subscribe(function (co) {
                console.log(_this.curso);
                console.log(item);
                co.curso = _this.curso;
                co.objetivo = item;
                console.log(co);
                //this.cursosObjetivo.push(co);
            });
        });
        //location.reload();
    };
    CursoObjetivoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-curso-objetivo',
            templateUrl: './curso-objetivo.component.html',
            styleUrls: ['./curso-objetivo.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            CursoService,
            ObjetivoService,
            CursoObjetivoService])
    ], CursoObjetivoComponent);
    return CursoObjetivoComponent;
}());
export { CursoObjetivoComponent };
//# sourceMappingURL=curso-objetivo.component.js.map