import { manufacturers } from '@/constants';
import { CarProps, FilterProps } from '@/types';
export async function fetchCars(filters: FilterProps) {

  const {fuel, limit, manufacturer, model, year} = filters

  const headers = {
		'X-RapidAPI-Key': '3f9080ce10msh3b608cbcaec44dap166dfcjsn9904b5bdba5f',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
  const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
    headers: headers
  });

  const result = await response.json()
  return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50 // base rental price per day in dollar
  const mileageFactor = 0.1 // Additional rate per mile driven
  const ageFactor = 0.05 // Additional rate per year of vechile age

  // calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0) 
}

export const generateCardImageURL = (car:CarProps, angle?: string) => {
  
  const url = new URL(`https://cdn.imagin.studio/getimage`)
  const {make, year, model} = car

  url.searchParams.append('customer', 'hrjavascript-mastery')
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle}`)

  return `${url}`
}

export const updateSearchParams = (type:string, value:string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`

  return newPathName
}