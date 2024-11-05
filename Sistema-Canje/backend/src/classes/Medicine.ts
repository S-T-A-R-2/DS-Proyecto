export class MedicineClass {
    constructor(private name: string, 
                private description: string, 
                private redeeming_points: number,
                private points_given: number) {
        this.name = name;
        this.description = description;
        this.redeeming_points = redeeming_points;
        this.points_given = points_given;
    }

  public getName(){
    return this.name;
  }
  public getDescription(){
    return this.description;
  }
  public getRedeeming_points(){
    return this.description;
  }
  public getPoints_given(){
    return this.points_given;
  }
  public setRedeemingPoints(points:number){
    this.redeeming_points = points;
  }
  public setPoints_given(points:number){
    this.points_given = points;
  }
}
