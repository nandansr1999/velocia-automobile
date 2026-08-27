from rest_framework.routers import DefaultRouter
from .views import CarViewSet, BookingViewSet

router = DefaultRouter()
router.register('cars', CarViewSet, basename='car')
router.register('bookings', BookingViewSet, basename='booking')

urlpatterns = router.urls