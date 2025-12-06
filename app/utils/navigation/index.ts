import { RootStackParamList } from '@appTypes/navigation';
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<Name extends keyof RootStackParamList>(
  name: Name,
  params?: RootStackParamList[Name],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

/**
 * Replace the current route
 */
export function replace<Name extends keyof RootStackParamList>(
  name: Name,
  params?: RootStackParamList[Name],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name as any, params));
  }
}

/**
 * Push a new route (even if same screen)
 */
export function push<Name extends keyof RootStackParamList>(
  name: Name,
  params?: RootStackParamList[Name],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name as any, params));
  }
}

/**
 * Reset stack fully (e.g. after login/logout)
 */
export function reset(
  routes: Array<{ name: keyof RootStackParamList; params?: object }>,
  index: number = 0,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
}

/**
 * Pop to first screen
 */
export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}
