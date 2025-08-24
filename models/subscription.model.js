import mongoose  from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100, 
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater then 0'],
    },
    currency: {
        type: String,
        enum: ['USD','BDT','EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY'],
        default: 'BDT'
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly', 'yearly'],
    },
    category:{
        type: String,
        enum: ['Sports', 'Entertainment', 'Education', 'Health', 'Productivity', 'Other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    }, 
    startDate:{
        type: Date, 
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date cannot be in the future'
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods [this.frequency]);
    }

    if(this,this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;