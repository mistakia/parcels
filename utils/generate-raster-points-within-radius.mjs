export default function ({ longitude, latitude, radius, cell_size }) {
  const points = []
  const earth_radius_meters = 6371000 // Earth's mean radius in meters
  const latitude_radians = (latitude * Math.PI) / 180
  const cell_size_radians = cell_size / earth_radius_meters
  const angular_radius = radius / earth_radius_meters

  for (let x = -angular_radius; x <= angular_radius; x += cell_size_radians) {
    for (let y = -angular_radius; y <= angular_radius; y += cell_size_radians) {
      if (x * x + y * y <= angular_radius * angular_radius) {
        const point_latitude = latitude + (x * 180) / Math.PI
        const point_longitude =
          longitude + (y * 180) / Math.PI / Math.cos(latitude_radians)
        points.push({ latitude: point_latitude, longitude: point_longitude })
      }
    }
  }

  return points
}
