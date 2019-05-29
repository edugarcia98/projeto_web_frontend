import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ObjetivoService } from './objetivo.service';
var ObjetivoComponent = /** @class */ (function () {
    function ObjetivoComponent(api) {
        this.api = api;
        this.selectedObjetivo = { id: -1, title: '', description: '' };
    }
    ObjetivoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getObjetivos().subscribe(function (items) { return _this.items = items; }, function (error) { return _this.error = error; });
    };
    ObjetivoComponent.prototype.add = function (itemTitle, itemDescription) {
        var _this = this;
        this.api.createObjetivo(itemTitle, itemDescription).subscribe(function (item) { return _this.items.push(item); });
        location.reload();
    };
    ObjetivoComponent.prototype.delete = function (id) {
        var _this = this;
        this.api.deleteObjetivo(id).subscribe(function (success) { return _this.items.splice(_this.items.findIndex(function (item) { return item.id === id; })); });
        location.reload();
    };
    ObjetivoComponent.prototype.objetivoClicked = function (objetivo) {
        var _this = this;
        this.api.showOneObjetivo(objetivo.id).subscribe(function (item) {
            _this.selectedObjetivo = item;
        });
    };
    ObjetivoComponent.prototype.update = function (id, title, description) {
        this.api.updateObjetivo(id, title, description).subscribe(function (item) {
            item.title = title;
            item.description = description;
        });
        location.reload();
    };
    ObjetivoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-objetivo',
            templateUrl: './objetivo.component.html',
            styleUrls: ['./objetivo.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ObjetivoService])
    ], ObjetivoComponent);
    return ObjetivoComponent;
}());
export { ObjetivoComponent };
//# sourceMappingURL=objetivo.component.js.map