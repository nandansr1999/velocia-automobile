from django.db import models

class Car(models.Model):
    name = models.CharField(max_length=100)
    tag = models.CharField(max_length=100)
    image_url = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='bookings')
    date = models.DateField()
    customer_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('car', 'date')

    def __str__(self):
        return f"{self.car.name} - {self.date}"