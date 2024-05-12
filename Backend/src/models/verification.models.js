import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const verificationTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
})

verificationTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        const hash = await bcrypt.hash(this.token, 10);
        this.token = hash;
    }
    next()
})

verificationTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token)
    return result
}
export const VerificationUser = mongoose.model("VerificationUser", verificationTokenSchema);