class Squad {
  constructor() {
    // List of both soldiers and vehicles
    this.units = [];
    this.isActive = () => {
      return this.units.filter((o, i) => o.health > 0).length > 0;
    };
  }
}

module.exports = Squad;
