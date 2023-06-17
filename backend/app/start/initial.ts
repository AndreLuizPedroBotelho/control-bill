import Event from '@ioc:Adonis/Core/Event'

export const start = () => {
  Event.emit('new:payment', {})
}
