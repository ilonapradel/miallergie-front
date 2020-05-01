import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

export class SearchUtilities {
  constructor() {}
}

export class SearchRequest {
  where: SearchRequestWhere = new SearchRequestWhere();
  include: SearchRequestInclude[] = [];
}

export class SearchRequestWhere {
  name?: SearchRequestWhereLike;
  duration?: SearchRequestWhereBetwen;
  difficulty: SearchRequestWhereLowerThan;
  or?: SearchRequestWhereOr[];
  and?: SearchRequestWhereAnd[];
}

export class SearchRequestIncludeScope {
  where: SearchRequestWhere = new SearchRequestWhere();
}

export class SearchRequestInclude {
  relation: string;
  scope: SearchRequestIncludeScope = new SearchRequestIncludeScope();
}
export class SearchRequestWhereLike {
  like: string;
}
export class SearchRequestWhereOr {
  type?: string;
  foodId?: string;
  dietId?: string;
}
export class SearchRequestWhereAnd {
  type?: string;
  foodId?: string;
  dietId?: string;
}
export class SearchRequestWhereBetwen {
  between: [number, number];
}
export class SearchRequestWhereLowerThan {
  lte: number;
}
