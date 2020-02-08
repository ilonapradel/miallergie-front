import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRecipePage } from './edit-recipe.page';

describe('EditRecipePage', () => {
  let component: EditRecipePage;
  let fixture: ComponentFixture<EditRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
