import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipeDisplayPage } from './recipe-display.page';

describe('RecipeDisplayPage', () => {
  let component: RecipeDisplayPage;
  let fixture: ComponentFixture<RecipeDisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDisplayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
