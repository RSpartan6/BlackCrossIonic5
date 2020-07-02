import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClasesalumnosPage } from './clasesalumnos.page';

describe('ClasesalumnosPage', () => {
  let component: ClasesalumnosPage;
  let fixture: ComponentFixture<ClasesalumnosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesalumnosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClasesalumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
