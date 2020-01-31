import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePreferencesPage } from './change-preferences.page';

describe('ChangePreferencesPage', () => {
  let component: ChangePreferencesPage;
  let fixture: ComponentFixture<ChangePreferencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePreferencesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
