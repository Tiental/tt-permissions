export enum TTActions {
  None = '0000',
  C = '1000',
  CR = '1100',
  CRU = '1110',
  CRUD = '1111',
  CU = '1010',
  CUD = '1011',
  CD = '1001',
  R = '0100',
  RU = '0110',
  RUD = '0111',
  RD = '0101',
  U = '0010',
  UD = '0011',
  D = '0001',
}

export class TTActionsUtility {
  public static ActionsFromString(actionsString: string): TTActions {
    switch (actionsString) {
    case '0000': { return TTActions.None }
    case '1000': { return TTActions.C }
    case '1100': { return TTActions.CR }
    case '1110': { return TTActions.CRU }
    case '1111': { return TTActions.CRUD }
    case '1010': { return TTActions.CU }
    case '1011': { return TTActions.CUD }
    case '1001': { return TTActions.CD }
    case '0100': { return TTActions.R }
    case '0110': { return TTActions.RU }
    case '0111': { return TTActions.RUD }
    case '0101': { return TTActions.RD }
    case '0010': { return TTActions.U }
    case '0011': { return TTActions.RU }
    case '0001': { return TTActions.D }
    default: { throw new Error('String could not be parsed as TTActions') }
    }
  }

  public static Add(actions1: TTActions, actions2: TTActions): TTActions {
    const actionsString1 = this.ActionsFromString(actions1)
    const actionsString2 = this.ActionsFromString(actions2)
    let result = '';

    for (let i=0; i < actionsString1.length; i ++) {
      if (actionsString1[i] == '1' || actionsString2[i] == '1') {
        result += '1'
      } else {
        result += '0'
      }
    }

    return this.ActionsFromString(result);
  }

  public static Subtract(actions1: TTActions, actions2: TTActions): TTActions {
    const actionsString1 = this.ActionsFromString(actions1)
    const actionsString2 = this.ActionsFromString(actions2)
    let result = '';

    for (let i=0; i < actionsString1.length; i ++) {
      if (actionsString1[i] == '1' && actionsString2[i] == '1') {
        result += '0'
      } else {
        result += actionsString1[i]
      }
    }

    return this.ActionsFromString(result);
  }

  public static Contains(actions1: TTActions, actions2: TTActions): boolean {
    const actionsString1 = this.ActionsFromString(actions1)
    const actionsString2 = this.ActionsFromString(actions2)

    for (let i=0; i < actionsString1.length; i ++) {
      if (actionsString1[i] == '0' && actionsString2[i] == '1') {
        console.log(actionsString1)
        console.log(actionsString2)
        return false
      }
    }
    return true;
  }
}

