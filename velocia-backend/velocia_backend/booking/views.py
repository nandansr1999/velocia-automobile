from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Car, Booking
from .serializers import CarSerializer, BookingSerializer

class CarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    @action(detail=False, methods=['get'])
    def availability(self, request):
        """Given ?date=YYYY-MM-DD, return every car with an `available` flag."""
        date = request.query_params.get('date')
        cars = Car.objects.all()
        booked_car_ids = set()
        if date:
            booked_car_ids = set(
                Booking.objects.filter(date=date).values_list('car_id', flat=True)
            )
        results = []
        for car in cars:
            data = CarSerializer(car).data
            data['available'] = car.id not in booked_car_ids
            results.append(data)
        return Response(results)


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)