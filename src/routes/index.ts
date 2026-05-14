import { Router } from "express";
import { AdoptionRoutes } from "./adoption";
import { CarRoutes } from "./car";
import { DogRoutes } from "./dog";
import { TuitionRoutes } from "./tuition";

export class Routes {
// agrega tus rutas aquí de la siguiente manera

public dogRoutes: DogRoutes = new DogRoutes();
public adoptionRoutes: AdoptionRoutes = new AdoptionRoutes();
public carRoutes: CarRoutes = new CarRoutes();
public tuitionRoutes: TuitionRoutes = new TuitionRoutes();
}
