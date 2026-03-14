export interface Device {
	id: string;
	name: string;
	version: string;
	user_id: string;
	status: 'active' | 'inactive';
	location: {
		latitude: number;
		longitude: number;
	};
}

export class DeviceManager {
	private devices: Device[] = []


	// constructor, gets called when a new instance of the class is created
	constructor() {

	}

	addDevice(device: Device): void {
		if (this.isDuplicateId(device.id)) {
			throw new Error('Device with id ' + device.id + ' already exists');
		}

		if (device.id == null || device.id === '') {
			throw new Error('Device must have an id');
		}
		else {
			this.devices.push(device);
		}

	}

	removeDevice(id: string): void {
		let foundDeviceIndex = -1;
		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].id === id) {
				foundDeviceIndex = i;
				break
			}
		}

		if (foundDeviceIndex == -1) {
			throw new Error('Device with id ' + id + ' not found');
		}
		else {
			if (this.devices.length > 0)
				this.devices.splice(foundDeviceIndex, 1);
		}
	}

	getDevice(id: string): Device | null {

		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].id === id) {
				return this.devices[i]
			}
		}
		return null;
	}

	getDevicesByVersion(version: string): Device[] | null {
		let foundDevices: Device[] = []
		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].version === version) {
				foundDevices.push(this.devices[i]);
			}
		}
		return foundDevices;
	}

	getDevicesByUserId(user_id: string): Device[] | null {
		let foundDevices: Device[] = []
		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].user_id === user_id) {
				foundDevices.push(this.devices[i]);
			}
		}
		return foundDevices;
	}

	getDevicesByStatus(status: 'active' | 'inactive' | 'pending' | 'failed'): Device[] | null {
		let foundDevices: Device[] = []
		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].status === status) {
				foundDevices.push(this.devices[i]);
			}
		}
		return foundDevices;
	}

	getDevicesInArea(latitude: number, longitude: number, radius_km: number): Device[] | null {
		// returns all devices within a radius of the given latitude and longitude
		// the radius is in kilometers
		let foundDevices: Device[] = []
		for (let i = 0; i < this.devices.length; i++) {
			let x = (longitude - this.devices[i].location.longitude)
			x = x * x

			let y = (latitude - this.devices[i].location.latitude)
			y = y * y

			let distSq = x + y

			if (distSq < radius_km * radius_km) {
				foundDevices.push(this.devices[i]);
			}
		}
		return foundDevices
	}

	getDevicesNearDevice(device_id: string, radius_km: number): Device[] | null {
		// returns all devices within a radius of the given device (not including the device itself)
		// the radius is in kilometers
		let cDevice = this.getDevice(device_id);
		if (cDevice == null) return null;

		let foundDevices: Device[] = []
		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].id == cDevice.id) continue;

			let x = (cDevice.location.longitude - this.devices[i].location.longitude)
			x = x * x

			let y = (cDevice.location.latitude - this.devices[i].location.latitude)
			y = y * y

			let distSq = x + y

			if (distSq < radius_km * radius_km) {
				foundDevices.push(this.devices[i]);
			}
		}
		return foundDevices
	}

	getAllDevices(): Device[] {
		return this.devices;
	}

	getDeviceCount(): number {
		return this.devices.length;
	}

	isDuplicateId(id: string): boolean {

		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].id === id) {
				return true;
			}
		}
		return false;

	}
}
