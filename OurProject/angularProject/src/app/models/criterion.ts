import { ValueList } from "./value-list";

export class Criterion {
    public CriterionId: number;
    public NameCriterion: string;
    public KindCriterion: number;
    public MaxValue: number;
    public MinValue: number;
    public Interested :number
    public multipleChoice:boolean
    public category: number;
    public ValueList: ValueList[];



   
}
