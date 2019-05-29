import { TestBed } from '@angular/core/testing';
import { CursoService } from './curso.service';
describe('CursoService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CursoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=curso.service.spec.js.map