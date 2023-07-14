export function kelvinToCelsius(kelvin: number) {
	return kelvin - 273;
}

export function celsiusToFahrenheit(celsius: number) {
	return celsius * (9 / 5) + 32;
}

export function kelvinToFahrenheit(kelvin: number) {
	return celsiusToFahrenheit(kelvinToCelsius(kelvin));
}
