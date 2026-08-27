from rest_framework import serializers
from .models import Car, Booking

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'tag', 'image_url']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'car', 'date', 'customer_name', 'email', 'phone', 'created_at']

    def validate(self, data):
        if Booking.objects.filter(car=data['car'], date=data['date']).exists():
            raise serializers.ValidationError("This car is already booked on the selected date.")
        return data

    def validate_phone(self, value):
        digits = ''.join(filter(str.isdigit, value))
        if len(digits) != 10:
            raise serializers.ValidationError("Enter a valid 10-digit phone number.")
        return value