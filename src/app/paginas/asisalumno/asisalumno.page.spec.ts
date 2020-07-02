import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsisalumnoPage } from './asisalumno.page';

describe('AsisalumnoPage', () => {
  let component: AsisalumnoPage;
  let fixture: ComponentFixture<AsisalumnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsisalumnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsisalumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
