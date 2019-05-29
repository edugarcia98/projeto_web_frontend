import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CursoService } from './curso.service';
import { Router } from '@angular/router';
var CursoComponent = /** @class */ (function () {
    function CursoComponent(api, router) {
        this.api = api;
        this.router = router;
        this.selectedCurso = { id: -1, title: '', description: '' };
    }
    CursoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getCursos().subscribe(function (items) { return _this.items = items; }, function (error) { return _this.error = error; });
    };
    CursoComponent.prototype.add = function (itemTitle, itemDescription) {
        var _this = this;
        this.api.createCurso(itemTitle, itemDescription).subscribe(function (item) { return _this.items.push(item); });
        location.reload();
    };
    CursoComponent.prototype.delete = function (id) {
        var _this = this;
        this.api.deleteCurso(id).subscribe(function (success) { return _this.items.splice(_this.items.findIndex(function (item) { return item.id === id; })); });
        location.reload();
    };
    CursoComponent.prototype.cursoClicked = function (curso) {
        var _this = this;
        this.api.showOneCurso(curso.id).subscribe(function (item) {
            _this.selectedCurso = item;
        });
    };
    CursoComponent.prototype.update = function (id, title, description) {
        this.api.updateCurso(id, title, description).subscribe(function (item) {
            item.title = title;
            item.description = description;
        });
        location.reload();
    };
    CursoComponent.prototype.goToObjetivos = function (item) {
        this.router.navigate(['/curso-objetivo', item.id]);
    };
    CursoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-curso',
            templateUrl: './curso.component.html',
            styleUrls: ['./curso.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CursoService, Router])
    ], CursoComponent);
    return CursoComponent;
}());
export { CursoComponent };
//# sourceMappingURL=curso.component.js.map