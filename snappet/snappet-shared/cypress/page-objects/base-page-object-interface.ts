interface BasePageObjectInterface {
    navigateTo(params?: {}): void;
    waitTillLoaded(): void;
}