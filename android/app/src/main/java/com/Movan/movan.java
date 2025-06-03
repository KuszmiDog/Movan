import com.movan.BatteryPackage; // Agregar esto arriba

...

@Override
protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> packages = new PackageList(this).getPackages();
    packages.add(new BatteryPackage()); // Agregar esta línea
    return packages;
}
