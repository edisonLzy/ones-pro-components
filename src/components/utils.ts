import { Children, ReactElement, ReactNode,Fragment } from 'react'

function isFragment(child: any) {
    return child && child.type === Fragment;
}

export function toArray(children: ReactNode){
    let ret: ReactElement[] = [];
    //
    Children.forEach(children, (child: any | any[]) => {
        if (Array.isArray(child)) {
          ret = ret.concat(toArray(child));
        } else if (isFragment(child) && child.props) {
          ret = ret.concat(toArray(child.props.children));
        } else {
          ret.push(child);
        }
      });
    return ret
}