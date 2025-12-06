export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    MainTab: { screen?: keyof MainTabParamList } | undefined;
}

export type MainTabParamList = {
    Home:undefined;
    Notifications:undefined;
    Messages:undefined;
    Profile:undefined;
};
