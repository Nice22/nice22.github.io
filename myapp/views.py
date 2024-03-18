from django.conf import settings
from django.http import JsonResponse
from django.core.mail import send_mail, BadHeaderError

def send_email(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=400)

    data = request.json()
    first_name = data.get("firstName")
    email_address = data.get("emailAddress")
    message = data.get("message")

    if not first_name or not email_address or not message:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    try:
        subject = f"New message from {first_name}"
        message = message
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [settings.EMAIL_HOST_USER]
        send_mail(subject, message, email_from, recipient_list)

        return JsonResponse({"success": True}, status=200)

    except BadHeaderError:
        return JsonResponse({"error": "Invalid header found"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)