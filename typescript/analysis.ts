/// <reference path="choices.ts" />
/// <reference path="optional_choices.ts" />


class ChoiceOption {
    text: string;
    effect: number;

    constructor(text: string, effect: number) {
        this.text = text;
        this.effect = effect;
    }

    static fromObject(optionObject: any): ChoiceOption {
        return new ChoiceOption(optionObject["text"], parseInt(optionObject["effect"]));
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

class Problem {
    choices: Choice[];
    chosen: [string, string][];

    constructor(choices: Choice[], chosen: [string, string][]) {
        this.choices = choices;
        this.chosen = chosen;
    }

    solve(): Map<number, [string, string][]> {
        let possible_values: Map<number, [string, string][]> = new Map<number, [string, string][]>();
        possible_values.set(0, [...this.chosen]);

        let chosen = [...this.chosen];

        for (let choice of this.choices) {
            if (Problem.alreadyMadeChoice(choice, chosen)) {
                continue;
            }

            let next_possible_values: Map<number, [string, string][]> = new Map<number, [string, string][]>();

            for (let [score, past_choices] of possible_values.entries()) {
                let options = [...choice.options];
                options.reverse(); // Reverse so that we tend to choose the first option

                for (let option of options) {
                    let new_score = score + option.effect;
                    let new_choices = [...past_choices];
                    new_choices.push([choice.text, option.text]);

                    next_possible_values.set(new_score, new_choices);
                }
            }

            possible_values = next_possible_values;
        }

        return possible_values;
    }

    static alreadyMadeChoice(choice: Choice, chosen: [string, string][]): Boolean {
        for (let j in chosen) {
            let c = chosen[j];

            if (c[0] == choice.text) {
                return true;
            }
        }

        return false;
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

let problem = new Problem(convertChoices(choices), []);
console.log(problem.solve());

problem = new Problem(convertChoices(choices), [
    ["\"Present to me your left arm.\"", "Extend your arm."],
    ["\"By the by... have we met somewhere before?\"", "Possibly..."],
    ["\"My name is Isabeau. What's yours?\"", "Introduce yourself"],
    ["\"What about you, [Hero]?\"", "It comes naturally to me."],
    ["\"Is this a friend of yours, [Hero]?", "Yes, it is."],
]);
console.log(problem.solve());
console.log(Math.min(...problem.solve().keys()));
console.log(Math.max(...problem.solve().keys()));

console.log(optional_choices);