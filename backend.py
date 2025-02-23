import kivy
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.scrollview import ScrollView
from kivy.uix.popup import Popup


class MainScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        layout = BoxLayout(orientation='vertical', padding=20, spacing=10)

        layout.add_widget(Label(text='Aushadh Tracker', font_size=24, size_hint_y=None, height=50))

        self.schedule_button = Button(text='Upload Medicine Schedule', size_hint_y=None, height=50)
        self.schedule_button.bind(on_press=self.go_to_schedule)
        layout.add_widget(self.schedule_button)

        self.expiry_button = Button(text='Check Expiration Date', size_hint_y=None, height=50)
        self.expiry_button.bind(on_press=self.go_to_expiry)
        layout.add_widget(self.expiry_button)

        self.stock_button = Button(text='Stock Update', size_hint_y=None, height=50)
        self.stock_button.bind(on_press=self.go_to_stock)
        layout.add_widget(self.stock_button)

        self.add_widget(layout)

    def go_to_schedule(self, instance):
        self.manager.current = 'schedule'

    def go_to_expiry(self, instance):
        self.manager.current = 'expiry'

    def go_to_stock(self, instance):
        self.manager.current = 'stock'


class MedicineSchedule(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.layout = BoxLayout(orientation='vertical', padding=20, spacing=10)
        self.medicines = []

        self.layout.add_widget(Label(text='Enter Medicine Details', font_size=18))

        self.med_name = TextInput(hint_text='Medicine Name')
        self.layout.add_widget(self.med_name)

        self.med_time = TextInput(hint_text='Time (HH:MM)')
        self.layout.add_widget(self.med_time)

        self.med_quantity = TextInput(hint_text='Quantity', input_filter=None)
        self.layout.add_widget(self.med_quantity)

        self.submit_button = Button(text='Submit', size_hint_y=None, height=50)
        self.submit_button.bind(on_press=self.store_medicine)
        self.layout.add_widget(self.submit_button)

        self.add_more_button = Button(text='Add More Medicine', size_hint_y=None, height=50, disabled=True)
        self.add_more_button.bind(on_press=self.add_more)
        self.layout.add_widget(self.add_more_button)

        self.scroll_view = ScrollView(size_hint=(1, None), size=(400, 200))
        self.medicine_list = BoxLayout(orientation='vertical', size_hint_y=None)
        self.medicine_list.bind(minimum_height=self.medicine_list.setter('height'))
        self.scroll_view.add_widget(self.medicine_list)
        self.layout.add_widget(self.scroll_view)

        self.back_button = Button(text='Back', size_hint_y=None, height=50)
        self.back_button.bind(on_press=self.go_back)
        self.layout.add_widget(self.back_button)

        self.add_widget(self.layout)

    def store_medicine(self, instance):
        name = self.med_name.text.strip()
        time = self.med_time.text.strip()
        quantity = self.med_quantity.text.strip()

        try:
            quantity = float(quantity)
        except ValueError:
            return

        if name and time and quantity > 0:
            medicine_entry = f"Medicine Name : {name} - Time : {time} - Quantity : {quantity}"
            self.medicines.append(medicine_entry)

            med_label = Label(text=medicine_entry, size_hint_y=None, height=30)
            delete_button = Button(text='Delete', size_hint_y=None, height=30, size_hint_x=0.3)
            delete_button.bind(on_press=lambda x: self.delete_medicine(med_label, delete_button, medicine_entry))

            row = BoxLayout(orientation='horizontal', size_hint_y=None, height=30)
            row.add_widget(med_label)
            row.add_widget(delete_button)

            self.medicine_list.add_widget(row)

            self.add_more_button.disabled = False

    def add_more(self, instance):
        self.med_name.text = ''
        self.med_time.text = ''
        self.med_quantity.text = ''

    def delete_medicine(self, label, button, medicine):
        self.medicine_list.remove_widget(label.parent)
        self.medicines.remove(medicine)
        if not self.medicines:
            self.add_more_button.disabled = True

    def go_back(self, instance):
        self.manager.current = 'main'


class ExpiryCheck(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.layout = BoxLayout(orientation='vertical', padding=20, spacing=10)
        self.medicines = {}

        self.layout.add_widget(Label(text='Check Expiration Date', font_size=18))

        self.med_name = TextInput(hint_text='Medicine Name')
        self.layout.add_widget(self.med_name)

        self.camera_button = Button(text='Simulate OCR', size_hint_y=None, height=50, on_press=self.simulate_ocr)
        self.layout.add_widget(self.camera_button)

        self.expiry_label = Label(text='Expiration Date: Not Scanned')
        self.layout.add_widget(self.expiry_label)

        self.submit_button = Button(text='Submit', size_hint_y=None, height=50, on_press=self.store_expiry)
        self.layout.add_widget(self.submit_button)

        self.add_more_button = Button(text='Add Another Medicine', size_hint_y=None, height=50, disabled=True, on_press=self.add_more)
        self.layout.add_widget(self.add_more_button)

        self.scroll_view = ScrollView(size_hint=(1, None), size=(400, 200))
        self.medicine_list = BoxLayout(orientation='vertical', size_hint_y=None)
        self.medicine_list.bind(minimum_height=self.medicine_list.setter('height'))
        self.scroll_view.add_widget(self.medicine_list)
        self.layout.add_widget(self.scroll_view)

        self.back_button = Button(text='Back', size_hint_y=None, height=50, on_press=self.go_back)
        self.layout.add_widget(self.back_button)

        self.add_widget(self.layout)

    def sim (self, instance):
        self.expiry_label.text = f"Expiration Date: 12-2025"

    def store_expiry(self, instance):
        name = self.med_name.text.strip()
        expiry = self.expiry_label.text.replace("Expiration Date: ", "").strip()

        if name and expiry != "Not Scanned":
            medicine_entry = f"Medicine Name : {name} - Expiry : {expiry}"
            self.medicines[name] = expiry

            med_label = Label(text=medicine_entry, size_hint_y=None, height=30)
            delete_button = Button(text='Delete', size_hint_x=0.3, size_hint_y=None, height=30)
            delete_button.bind(on_press=lambda x, lbl=med_label, btn=delete_button, med=name: self.delete_medicine(lbl, btn, med))

            entry_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=30)
            entry_layout.add_widget(med_label)
            entry_layout.add_widget(delete_button)
            self.medicine_list.add_widget(entry_layout)

            self.add_more_button.disabled = False

    def delete_medicine(self, label, button, medicine):
        self.medicine_list.remove_widget(label.parent)
        del self.medicines[medicine]
        if not self.medicines:
            self.add_more_button.disabled = True

    def add_more(self, instance):
        self.med_name.text = ''
        self.expiry_label.text = 'Expiration Date: Not Scanned'

    def go_back(self, instance):
        self.manager.current = 'main'


class StockUpdate(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.layout = BoxLayout(orientation='vertical', spacing=10, padding=20)
        self.medicines = {}

        self.layout.add_widget(Label(text='Enter Stock Details', font_size=20))

        self.med_name = TextInput(hint_text='Medicine Name')
        self.layout.add_widget(self.med_name)

        self.current_stock = TextInput(hint_text='Current Stock', input_filter='int')
        self.layout.add_widget(self.current_stock)

        self.prescribed_quantity = TextInput(hint_text='Prescribed Quantity', input_filter='int')
        self.layout.add_widget(self.prescribed_quantity)

        self.submit_button = Button(text='Submit', on_press=self.store_stock)
        self.layout.add_widget(self.submit_button)

        self.add_more_button = Button(text='Add More', on_press=self.add_more, disabled=True)
        self.layout.add_widget(self.add_more_button)

        self.scroll_view = ScrollView(size_hint=(1, None), size=(400, 200))
        self.stock_list = BoxLayout(orientation='vertical', size_hint_y=None)
        self.stock_list.bind(minimum_height=self.stock_list.setter('height'))
        self.scroll_view.add_widget(self.stock_list)
        self.layout.add_widget(self.scroll_view)

        self.back_button = Button(text='Back', on_press=self.go_back)
        self.layout.add_widget(self.back_button)

        self.add_widget(self.layout)

    def store_stock(self, instance):
        name = self.med_name.text.strip()
        stock = self.current_stock.text.strip()
        prescribed = self.prescribed_quantity.text.strip()

        if name and stock.isdigit() and prescribed.isdigit():
            stock = int(stock)
            prescribed = int(prescribed)
            self.medicines[name] = (stock, prescribed)

            stock_item = BoxLayout(orientation='horizontal', size_hint_y=None, height=40)
            stock_label = Label(text=f"Medicine Name : {name} - Stock : {stock} - Prescribed : {prescribed}")
            delete_button = Button(text='Delete', size_hint_x=0.3)
            delete_button.bind(on_press=lambda x, lbl=stock_label, btn=delete_button, med=name: self.delete_stock(lbl, btn, med))

            stock_item.add_widget(stock_label)
            stock_item.add_widget(delete_button)
            self.stock_list.add_widget(stock_item)

            if stock >= prescribed-10:
                self.show_alert("Stock running low! Consider restocking.")

            self.add_more_button.disabled = False

    def delete_stock(self, label, button, medicine):
        self.stock_list.remove_widget(label.parent)
        del self.medicines[medicine]
        if not self.medicines:
            self.add_more_button.disabled = True

    def add_more(self, instance):
        self.med_name.text = ''
        self.current_stock.text = ''
        self.prescribed_quantity.text = ''

    def show_alert(self, message):
        popup = Popup(title='Stock Alert', content=Label(text=message), size_hint=(None, None), size=(400, 200))
        popup.open()

    def go_back(self, instance):
        self.manager.current = 'main'



class MedicineApp(App):
    def build(self):
        sm = ScreenManager()
        sm.add_widget(MainScreen(name='main'))
        sm.add_widget(MedicineSchedule(name='schedule'))
        sm.add_widget(ExpiryCheck(name='expiry'))
        sm.add_widget(StockUpdate(name='stock'))
        return sm


if __name__ == '__main__':
    MedicineApp().run()
