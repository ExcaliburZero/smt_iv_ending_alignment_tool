/// <reference path="choices.ts" />


class ChoiceOption {
    text: string;
    effect: number;

    constructor(text: string, effect: number) {
        this.text = text;
        this.effect = effect;
    }

    static fromObject(optionObject: any): ChoiceOption {
        return new ChoiceOption(optionObject["text"], optionObject["effect"]);
    }
}

class Choice {
    text: string;
    options: ChoiceOption[];

    constructor(text: string, options: ChoiceOption[]) {
        this.text = text;
        this.options = options;
    }

    static fromObject(choiceObject: any): Choice {
        let options: ChoiceOption[] = [];
        for (let i in choiceObject["options"]) {
            let o = choiceObject["options"][i];
            options.push(ChoiceOption.fromObject(o));
        }

        return new Choice(
            choiceObject["prompt"],
            options,
        );
    }
}

function convertChoices(choices: any[]) {
    let converted = [];

    for (let i in choices) {
        let c = choices[i];

        let convertedC = Choice.fromObject(c);
        converted.push(convertedC);
    }

    return converted;
}

console.log(choices);
console.log(convertChoices(choices));