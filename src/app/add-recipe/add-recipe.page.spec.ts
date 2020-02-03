import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRecipePage } from './add-recipe.page';

describe('AddRecipePage', () => {
  let component: AddRecipePage;
  let fixture: ComponentFixture<AddRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
