import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarclasePage } from './editarclase.page';

describe('EditarclasePage', () => {
  let component: EditarclasePage;
  let fixture: ComponentFixture<EditarclasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarclasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarclasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
