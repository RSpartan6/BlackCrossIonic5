import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearclasePage } from './crearclase.page';

describe('CrearclasePage', () => {
  let component: CrearclasePage;
  let fixture: ComponentFixture<CrearclasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearclasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearclasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
