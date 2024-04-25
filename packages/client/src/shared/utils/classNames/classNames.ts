import { TClassNamesParams } from './classNames.interfaces';

export const classNames = (params: TClassNamesParams | string[]): string => {
  let classes: string[];

  if (Array.isArray(params)) {
    classes = params;
  } else {
    classes = Object.entries(params).reduce<string[]>((acc, pair) => {
      const [className, isActive] = pair;

      if (isActive) {
        acc.push(className);
      }

      return acc;
    }, []);
  }

  return classes.join(' ');
};
