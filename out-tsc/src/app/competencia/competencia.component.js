import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CompetenciaService } from './competencia.service';
var CompetenciaComponent = /** @class */ (function () {
    function CompetenciaComponent(api) {
        this.api = api;
        this.selectedCompetencia = { id: -1, title: '', description: '' };
    }
    CompetenciaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getCompetencias().subscribe(function (items) { return _this.items = items; }, function (error) { return _this.error = error; });
    };
    CompetenciaComponent.prototype.add = function (itemTitle, itemDescription) {
        var _this = this;
        this.api.createCompetencia(itemTitle, itemDescription).subscribe(function (item) { return _this.items.push(item); });
        location.reload();
    };
    CompetenciaComponent.prototype.delete = function (id) {
        var _this = this;
        this.api.deleteCompetencia(id).subscribe(function (success) { return _this.items.splice(_this.items.findIndex(function (item) { return item.id === id; })); });
        location.reload();
    };
    CompetenciaComponent.prototype.competenciaClicked = function (competencia) {
        var _this = this;
        this.api.showOneCompetencia(competencia.id).subscribe(function (item) {
            _this.selectedCompetencia = item;
        });
    };
    CompetenciaComponent.prototype.update = function (id, title, description) {
        this.api.updateCompetencia(id, title, description).subscribe(function (item) {
            item.title = title;
            item.description = description;
        });
        location.reload();
    };
    CompetenciaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-competencia',
            templateUrl: './competencia.component.html',
            styleUrls: ['./competencia.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CompetenciaService])
    ], CompetenciaComponent);
    return CompetenciaComponent;
}());
export { CompetenciaComponent };
//# sourceMappingURL=competencia.component.js.map